import numpy as np
from PIL import Image

img_path = '/home/nehal/Dev/Frontend/app/public/images/vecteezy_pretty-european-woman-in-winter-fur-coat-and-stylish-dress_31416664.jpg'
img = Image.open(img_path)
width, height = img.size

# Let's downsample the image to analyze it faster
small_img = img.resize((600, 400))
img_data = np.array(small_img)

# Background color is roughly (224, 223, 221)
# Let's count pixels that are significantly different from the background
bg = np.array([224, 223, 221])
diff = np.abs(img_data - bg)
diff_sum = np.sum(diff, axis=2)

# Threshold: diff_sum > 15
non_bg = diff_sum > 15

# Find bounding box in downsampled image
rows = np.any(non_bg, axis=1)
cols = np.any(non_bg, axis=0)
ymin, ymax = np.where(rows)[0][0], np.where(rows)[0][-1]
xmin, xmax = np.where(cols)[0][0], np.where(cols)[0][-1]

# Map back to original size
orig_ymin = int(ymin * (height / 400.0))
orig_ymax = int(ymax * (height / 400.0))
orig_xmin = int(xmin * (width / 600.0))
orig_xmax = int(xmax * (width / 600.0))

print(f"Downsampled bounding box: xmin={xmin}, xmax={xmax}, ymin={ymin}, ymax={ymax}")
print(f"Original bounding box: xmin={orig_xmin}, xmax={orig_xmax}, ymin={orig_ymin}, ymax={orig_ymax}")
