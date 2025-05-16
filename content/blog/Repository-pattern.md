---
title: 設計模式:Repository Pattern
date: 2022-11-28 11:03:36
tags: [Design Patterns]
---

## 問題

* 應用程式都有資料存取需求，大多使用關聯式資料庫，使用如ADO.NET, OLE DB...介面，再搭配SQL指令來操作資料
* 過往小型應用程式資料來源通常來自資料庫, 但現在提倡分散式, 雲端化的情況下, 資料來源具有多樣性
* 傳統做法:應用程式邏輯與資料存取介面緊密結合, 會提高整合資料的難度

## 使用時機

* 資料來源需要有任意抽換的功能
* 抽離對DB操作的功能到Repository
<!--more-->
## Repository 模式

Layered Architecture:
View ⇆ Controller ⇆ Service ⇆ Repository ⇆ Model

* View:資料呈現頁面
* Controller:API的接口
* Service:處裡商業邏輯, 電商有購物、付款邏輯;金融有存錢、轉帳邏輯
* Repository:資料庫操作&資料處理
* Model:資料與DAO的Mapping

為了達到抽換的功能, 使用Interface來達到這個特性, 可以分成泛型跟客製化介面

## 泛型與客製化Interface

* 泛型IRepository:
所有Repository使用同一個Interface, 僅實作[CRUD](https://zh.wikipedia.org/zh-tw/%E5%A2%9E%E5%88%AA%E6%9F%A5%E6%94%B9), 如果資料庫操作不複雜,　使用泛型方式有效減少重複撰寫的程式碼

```C#
public interface IGenericRepository<T>
{
    Task Create(T entity);
    Task<List<T>> GetAll();
    Task Update(T entity);
    Task Delete(int id);
}
```

* 客製化IRepository:
針對特定資料Mapping並封裝這些過程, 提高彈性

```C#
public interface IBlogRepository
{
  // define interface
}

public class BlogRepository : IBlogRepository
{
  // implement interfaces
}

public interface ICommentRepository
{
  // define interface
}

public class CommentRepository : ICommentRepository
{
  // implement interfaces
}
```

## 實快速切換Dapper與EF操作

[完整code放在github](https://github.com/yanzzzzzzzzz/RepositoryTest)

建立通用interface

```C#
public interface IGenericRepository<T>
{
    Task Create(T entity);
    Task<List<T>> GetAll();
    Task Update(T entity);
    Task Delete(int id);
    
}
```

對通用interface繼承後新增一個初始化DB function 的接口

```C#
public interface IBlogRepository:IGenericRepository<BlogModel>
{
    void InitBlogTable();
}
```

### Dapper Repository 實作

```C#
public class DapperBlogRepository : IBlogRepository
{
    private readonly ConnectionStringProvider connectionStringProvider;
    private static bool isInit = false;

    public DapperBlogRepository(ConnectionStringProvider connectionStringProvider)
    {
        this.connectionStringProvider = connectionStringProvider;
        InitBlogTable();
    }

    public void InitBlogTable()
    {
        using var connection = new SQLiteConnection(connectionStringProvider.ConnectionString);
        connection.Execute(@"
                    Create table if not exists Blog (
                        Id INTEGER PRIMARY KEY AUTOINCREMENT,
                        Title VARCHAR(50),
                        Content VARCHAR(50)
                    )");
        if (!isInit)
        {
            var data = connection.Query<BlogModel>("select * from Blog").ToList();
            if (!data.Any())
            {
                foreach (var blog in Util.generatorData())
                {
                    connection.Execute("Insert into Blog(Title, Content) values (@Title, @Content)", blog);
                }
            }
            isInit = true;
        }
    }
    public Task Create(BlogModel entity)
    {
        using var connection = new SQLiteConnection(connectionStringProvider.ConnectionString);
        return connection.ExecuteAsync("Insert into Blog(Title, Content) values (@Title, @Content)", entity);
    }

    public Task Delete(int id)
    {
        using var connection = new SQLiteConnection(connectionStringProvider.ConnectionString);
        return connection.ExecuteAsync("DELETE FROM Blog WHERE Id=@id", new { Id = id });
        
    }

    public async Task<List<BlogModel>> GetAll()
    {
        using var connection = new SQLiteConnection(connectionStringProvider.ConnectionString);
        return (await connection.QueryAsync<BlogModel>("select * from Blog")).ToList();
    }
    public Task Update(BlogModel entity)
    {
        using var connection = new SQLiteConnection(connectionStringProvider.ConnectionString);
        return connection.ExecuteAsync("UPDATE Blog SET Title = @Title, Content = @Content WHERE Id=@Id", entity);
    }
}
```

### Controller實作

Controller端建構子注入Repository 使用function

```C#
[Route("api/[controller]")]
[ApiController]
public class BlogController : ControllerBase
{
    private readonly IBlogRepository blogRepository;

    public BlogController(IBlogRepository blogRepository)
    {
        this.blogRepository = blogRepository;
    }

    [HttpGet]
    public Task<List<BlogModel>> GetAll()
    {
        return blogRepository.GetAll();
    }
    [HttpPost]
    public Task Create(BlogModel blogModel)
    {
        return blogRepository.Create(blogModel);
    }
    [HttpPut]
    public Task Update(BlogModel blogModel)
    {
        return blogRepository.Update(blogModel);
    }
    [HttpDelete("{id}")]
    public Task Delete(int id)
    {
        return blogRepository.Delete(id);
    }
}
```

### 依賴注入

在Program.cs啟動Web前依賴注入IBlogRepository

```C#
var builder = WebApplication.CreateBuilder(args);
// ...
builder.Services.AddScoped<IBlogRepository, DapperBlogRepository>()
//...
var app = builder.Build();
//...
app.Run();
```

到這裡完成使用Dapper操作DB的api實作

再來加入EntityFramework的Repository實作

### EF Repository 實作

```C#
public class EFBlogRepository : IBlogRepository
    {
        private readonly EFDbContext _context;

        public EFBlogRepository(EFDbContext context)
        {
            _context = context;
            InitBlogTable();
        }

        private static bool isInit = false;
        public async Task Create(BlogModel entity)
        {
            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var blog = await _context.Blog.SingleOrDefaultAsync(e => e.Id == id);
            if (blog == null)
            {
                throw new Exception("Not found");
            }
            _context.Blog.Remove(blog);
            await _context.SaveChangesAsync();
        }

        public Task<List<BlogModel>> GetAll()
        {
            return _context.Blog.ToListAsync();
        }

        public void InitBlogTable()
        {
            if (!isInit)
            {
                if (!_context.Blog.Any())
                {
                    _context.Blog.AddRange(Common.Common.generatorData());
                    _context.SaveChanges();
                }
                isInit = true;
            }
        }

        public async Task Update(BlogModel entity)
        {
            var blog = await _context.Blog.SingleOrDefaultAsync(e => e.Id == entity.Id);
            if (blog == null)
            {
                throw new Exception("Not found");
            }
            blog.Title = entity.Title;
            blog.Content = entity.Content;
            _context.Blog.Update(blog);
            await _context.SaveChangesAsync();
        }
    }
```

### 決定注入哪個實作

appsettings.json新增參數

```C#
{
  // ...,
  "DataAccessLibrary": "Dapper" //Dapper or EF
}
```

Program.cs 讀取appsettings的參數來決定注入哪個Repository

```C#
// ...
var dataAccessLibrary = configuration.GetSection("DataAccessLibrary").Get<string>();
if (dataAccessLibrary == "Dapper")
{
    Console.WriteLine("Use Dapper");
    builder.Services.AddScoped<IBlogRepository, DapperBlogRepository>();
}
else
{
    Console.WriteLine("Use EF");
    builder.Services.AddScoped<IBlogRepository, EFBlogRepository>();
}
// ...
```

這樣就完成使用外部參數的方式來快速切換資料庫實作的功能

## 解決了甚麼

* 上層的服務 (Service) 只要關心 Repository 的抽象化 API, 並且當資料來源變更時, 使用DI抽換掉Repository API 的實作就好
* 減少重複撰寫查詢邏輯
