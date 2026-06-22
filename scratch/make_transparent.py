import os
from PIL import Image

image_path = "/home/nehal/Dev/Frontend/app/public/images/hero-model.png"
if os.path.exists(image_path):
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # Let's check the corners to see what the background color is
    # Usually it's close to light beige/white
    for item in datas:
        # If the pixel is very light (R, G, B all > 220 or similar)
        # Let's use a dynamic threshold
        r, g, b, a = item
        # Since it's a solid studio background, light beige or white is usually R > 220, G > 215, B > 200
        if r > 215 and g > 210 and b > 195:
            # Make it fully transparent
            newData.append((r, g, b, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(image_path, "PNG")
    print("Background made transparent successfully!")
else:
    print("Image not found!")
