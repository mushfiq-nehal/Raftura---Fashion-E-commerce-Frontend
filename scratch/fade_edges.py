import os
import numpy as np
from PIL import Image

image_path = "/home/nehal/Dev/Frontend/app/public/images/hero-model.png"
if os.path.exists(image_path):
    img = Image.open(image_path).convert("RGB")
    width, height = img.size
    
    # Target color: #ECE7E1 (236, 231, 225)
    target_r, target_g, target_b = 236, 231, 225
    
    # Set fade_top to 0 to prevent blurring the model's hair/head!
    # Set fade_bottom to 0 since it rests flush on the layout edge.
    fade_top = 0
    fade_bottom = 0
    fade_left = 35
    fade_right = 35
    
    img_data = np.array(img, dtype=np.float32)
    
    for y in range(height):
        for x in range(width):
            # Calculate distance factor for top/bottom (disabled by setting to 1.0)
            factor_y = 1.0
            if fade_top > 0 and y < fade_top:
                factor_y = y / fade_top
            elif fade_bottom > 0 and y > height - fade_bottom:
                factor_y = (height - y) / fade_bottom
                
            # Calculate distance factor for left/right
            factor_x = 1.0
            if x < fade_left:
                factor_x = x / fade_left
            elif x > width - fade_right:
                factor_x = (width - x) / fade_right
                
            # Combined factor is the minimum of the two
            factor = min(factor_x, factor_y)
            
            # Smooth the factor using a cubic curve
            factor = 3 * (factor ** 2) - 2 * (factor ** 3)
            
            # Blend pixel with target color
            r, g, b = img_data[y, x]
            img_data[y, x, 0] = r * factor + target_r * (1 - factor)
            img_data[y, x, 1] = g * factor + target_g * (1 - factor)
            img_data[y, x, 2] = b * factor + target_b * (1 - factor)
            
    result_img = Image.fromarray(np.clip(img_data, 0, 255).astype(np.uint8))
    result_img.save(image_path, "PNG")
    print("Edge fade with fade_top=0 applied successfully!")
else:
    print("Image not found!")
