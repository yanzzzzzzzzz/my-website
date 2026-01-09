---
title: Panel Defect Detection
year: 2019
skills: ["MATLAB", "Image Processing", "Template Matching", "Computer Vision"]
summary: Built a system for defect classification on display panels using image matching and feature extraction.
images: ["/images/panel-defect-detection/1.png"]
github: ""
demo: ""
---

## Overview

An automated defect inspection system for flat panel displays (FPD) using advanced image processing techniques to detect and classify various types of manufacturing defects.

## Features

- **Defect Detection**: Identify scratches, spots, lines, and other anomalies
- **Classification**: Categorize defects by type and severity
- **Template Matching**: Reference-based comparison
- **Feature Extraction**: Advanced pattern recognition
- **Statistical Analysis**: Defect distribution reporting

## Tech Stack

- **Platform**: MATLAB
- **Image Processing**: MATLAB Image Processing Toolbox
- **Computer Vision**: Template matching algorithms
- **Data Analysis**: Statistical analysis tools

## Detection Methods

### Template Matching

- Reference image comparison
- Normalized cross-correlation
- Multi-scale matching
- Rotation-invariant detection

### Feature Extraction

- Edge detection (Canny, Sobel)
- Morphological operations
- Texture analysis
- Contrast enhancement

### Classification Algorithms

- Threshold-based classification
- Feature-based categorization
- Size and shape analysis
- Defect severity grading

## Defect Types Detected

1. **Scratches**: Linear surface damages
2. **Spots**: Point defects and contamination
3. **Lines**: Mura lines and streaks
4. **Stains**: Irregular contamination patterns
5. **Bubbles**: Air bubble defects

## Technical Approach

### Preprocessing

- Image alignment and registration
- Noise reduction
- Contrast adjustment
- Region of interest (ROI) extraction

### Detection Pipeline

1. Load reference and test images
2. Preprocessing and enhancement
3. Template matching / feature extraction
4. Defect candidate identification
5. Classification and grading
6. Report generation

## Results

- Detection accuracy: >92%
- Processing time: <2 seconds per panel
- False positive rate: <5%
- Suitable for production line integration

## Industrial Application

- Implemented in LCD/OLED panel manufacturing
- Reduced manual inspection time by 70%
- Improved quality control consistency
- Enabled early defect detection in production
