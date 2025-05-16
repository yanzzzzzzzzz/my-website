---
title: LINQ查詢語法
date: 2022-11-21 17:23:09
tags:
---

## LINQ介紹

語言整合查詢(英語：Language Integrated Query，縮寫：LINQ)是Microsoft的一種查詢語法技術，C#、VB都可以使用

## LINQ 語法

### Where

```C#
// filter odd number
int[] numbers = { 5, 10, 8, 3, 6, 12};
IEnumerable<int> numQuery2 = numbers.Where(num => num % 2 == 0)
// Output: 10 8 6 12
```
<!--more-->
### OrderBy

```C#
// filter odd number
int[] numbers = { 5, 10, 8, 3, 6, 12};
IEnumerable<int> numQuery2 = numbers.Where(num => num % 2 == 0).OrderBy(n => n);
// Output:6 8 10 12
```

### Contains

```C#
string[] fruits = { "apple", "banana", "mango", "orange", "passionfruit", "grape" };

string fruit = "mango";

bool hasMango = fruits.Contains(fruit);
// hasMango=true
```

### Join

```C#
class Product
{
    public string Name { get; set; }
    public int CategoryID { get; set; }
}

class Category
{
    public string Name { get; set; }
    public int ID { get; set; }
}

class ProductWithCategoryName
{
    public string ProductName { get; set; }
    public string CategoryName { get; set; }
}
static void Main(string[] args)
{
    List<Category> categories = new List<Category>()
    {
        new Category {Name="Beverages", ID=001},
        new Category {Name="Condiments", ID=002},
        new Category {Name="Vegetables", ID=003},
        new Category {Name="Grains", ID=004},
        new Category {Name="Fruit", ID=005}
    };

    // Specify the second data source.
    List<Product> products = new List<Product>()
    {
      new Product {Name="Cola",  CategoryID=001},
      new Product {Name="Tea",  CategoryID=001},
      new Product {Name="Mustard", CategoryID=002},
      new Product {Name="Pickles", CategoryID=002},
      new Product {Name="Carrots", CategoryID=003},
      new Product {Name="Bok Choy", CategoryID=003},
      new Product {Name="Peaches", CategoryID=005},
      new Product {Name="Melons", CategoryID=005},
    };
    var productWithCategoryNameList = products.Join(categories,
                              p => p.CategoryID,
                              c => c.ID,
                              (p, c) => new ProductWithCategoryName
                              {
                                  ProductName = p.Name,
                                  CategoryName = c.Name,
                              }.ToList());
// productWithCategoryNameList=
// ProductName:Cola        ,CategoryName:Beverages
// ProductName:Tea         ,CategoryName:Beverages
// ProductName:Mustard     ,CategoryName:Condiments
// ProductName:Pickles     ,CategoryName:Condiments
// ProductName:Carrots     ,CategoryName:Vegetables
// ProductName:Bok Choy    ,CategoryName:Vegetables
// ProductName:Peaches     ,CategoryName:Fruit
// ProductName:Melons      ,CategoryName:Fruit
}
```

語法等同於:SELECT * FROM Product JOIN Category ON Product.CategoryID=Category.ID

也可以在LINQ語法中寫入function

```C#
class ProductAndCategoryName
{
    public string Name { get; set; }
}

var ConcatNameList = products.Join(categories,
                            p => p.CategoryID,
                            c => c.ID,
                            (p, c) =>
                            {
                                string str = p.Name + "_" + c.Name;
                                return new ProductAndCategoryName
                                {
                                    Name = str,
                                };
                            });
// ConcatNameList:                            
// Name:Cola_Beverages
// Name:Tea_Beverages
// Name:Mustard_Condiments
// Name:Pickles_Condiments
// Name:Carrots_Vegetables
// Name:Bok Choy_Vegetables
// Name:Peaches_Fruit
// Name:Melons_Fruit
```

第一個資料來源.Join(第二個資料來源,
                    one => 要比較欄位,
                    two => 要比較欄位,
                    (one, two) => {function})

## ForEach

```C#
List<Category> categories = new List<Category>()
    {
        new Category {Name="Beverages", ID=001},
        new Category {Name="Condiments", ID=002},
        new Category {Name="Vegetables", ID=003},
        new Category {Name="Grains", ID=004},
        new Category {Name="Fruit", ID=005}
    };
categories.ForEach(e => Console.WriteLine(e.Name));
// Beverages
// Condiments
// Vegetables
// Grains
// Fruit
```
