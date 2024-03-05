import cv2
import numpy as np
import os

def tile_image(image_path, output_dir, tiling_factor):
    # Load the image
    image = cv2.imread(image_path)

    # Get the dimensions of the image
    height, width, channels = image.shape

    # Create a new image by repeating the original image tiling_factor times in both axes
    tiled_image = np.tile(image, (tiling_factor, tiling_factor, 1))

    # Ensure the output directory exists
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Save the tiled image to the output directory
    base_name = os.path.basename(image_path)
    output_path = os.path.join(output_dir, f"tiled_{base_name}")
    cv2.imwrite(output_path, tiled_image)
    print(f"Tiled image saved as {output_path}")

def process_folder(input_dir, output_dir, tiling_factor):
    # Iterate over all the files in the input directory
    for file_name in os.listdir(input_dir):
        file_path = os.path.join(input_dir, file_name)

        # Check if the file is an image
        if os.path.isfile(file_path) and file_name.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tif', '.tiff', '.webp')):
            print(f"Processing {file_name}...")
            tile_image(file_path, output_dir, tiling_factor)
        else:
            print(f"Skipping {file_name}, not an image.")

# Specify your input and output directories here
input_directory = 'F:\\dev\\space-ships\\resources\\spaceships'
output_directory = 'F:\\dev\\space-ships\\resources\\tiled'
tiling_factor = 4  # Change this to your desired tiling factor

process_folder(input_directory, output_directory, tiling_factor)
