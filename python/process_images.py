import cv2
import numpy as np
import os

def process_image(image_path, output_dir):
    # Load the image
    image = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)

    # Check if the image has an alpha channel
    if image.shape[2] == 4:
        # Separate the alpha channel and color channels
        alpha_channel = image[:, :, 3]
        color_channels = image[:, :, :3]

        # Use dilation on the alpha channel to thicken the lines
        # Create a kernel for dilation; you may adjust the kernel size and shape as needed
        kernel = np.ones((3,3), np.uint8)
        dilated_alpha = cv2.dilate(alpha_channel, kernel, iterations=1)

        # Apply Gaussian blur to the dilated alpha channel to simulate shadow bleeding
        blurred_alpha = cv2.GaussianBlur(dilated_alpha, (21, 21), 0)

        # Create a mask where the original alpha was, to color the lines dark grey
        mask = dilated_alpha > 0

        # Color the lines dark grey on the blurred alpha channel mask
        color_channels[mask] = [64, 64, 64]  # Dark grey color

        # Merge color channels and blurred alpha channel back
        result_image = np.dstack((color_channels, blurred_alpha))
    else:
        # If no alpha channel, prepare the image for dilation and blurring
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        _, binary_image = cv2.threshold(gray_image, 1, 255, cv2.THRESH_BINARY)

        # Dilate the binary image to thicken lines
        kernel = np.ones((3,3), np.uint8)
        dilated_image = cv2.dilate(binary_image, kernel, iterations=1)

        # Apply Gaussian blur to the dilated image
        blurred_image = cv2.GaussianBlur(dilated_image, (21, 21), 0)

        # Color the lines dark grey (this step is a bit tricky without a clear alpha, might need adjustment)
        result_image = cv2.cvtColor(blurred_image, cv2.COLOR_GRAY2BGR)
        result_image[result_image > 0] = [64, 64, 64]

    # Construct the output path
    base_name = os.path.basename(image_path)
    output_path = os.path.join(output_dir, base_name)

    # Save the result image
    cv2.imwrite(output_path, result_image)

def process_folder(input_dir, output_dir):
    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Iterate over all the files in the input directory
    for file_name in os.listdir(input_dir):
        file_path = os.path.join(input_dir, file_name)

        # Check if the file is an image
        if os.path.isfile(file_path) and file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
            print(f"Processing {file_name}...")
            process_image(file_path, output_dir)

# Specify your input and output directories here
input_directory = 'F:\\dev\\space-ships\\resources\\textures'
output_directory = 'F:\\dev\\space-ships\\resources\\shadowed'

process_folder(input_directory, output_directory)
