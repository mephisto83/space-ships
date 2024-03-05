import cv2
import os
import numpy as np
def combine_images(image_a_path, image_b_path, output_dir, target_size=(640, 640)):
    # Load the images
    image_a = cv2.imread(image_a_path, cv2.IMREAD_UNCHANGED)  # Image A with transparency
    image_b = cv2.imread(image_b_path)  # Image B (background)

    # Resize both images to target size
    image_a_resized = cv2.resize(image_a, target_size)
    image_b_resized = cv2.resize(image_b, target_size)

    # Assuming image A has 4 channels (RGBA) and image B is RGB
    if image_a_resized.shape[2] == 4:
        alpha_channel = image_a_resized[:, :, 3] / 255.0
        rgb_channels = image_a_resized[:, :, :3]

        # Create a mask for blending
        alpha_mask = np.dstack([alpha_channel, alpha_channel, alpha_channel])

        # Blend the images based on alpha channel of image A
        combined_image = alpha_mask * rgb_channels + (1 - alpha_mask) * image_b_resized
    else:
        combined_image = image_a_resized  # Fallback if image A is not RGBA

    # Construct the output path
    base_name_a = os.path.splitext(os.path.basename(image_a_path))[0]
    base_name_b = os.path.splitext(os.path.basename(image_b_path))[0]
    output_path = os.path.join(output_dir, f"{base_name_a}_{base_name_b}.png")

    # Ensure the output directory exists
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Save the combined image
    cv2.imwrite(output_path, combined_image)
    print(f"Saved combined image to {output_path}")

def process_folders(folder_a, folder_b, output_dir, target_size=(640, 640)):
    # Get all the image files from both folders
    files_a = [f for f in os.listdir(folder_a) if os.path.isfile(os.path.join(folder_a, f))]
    files_b = [f for f in os.listdir(folder_b) if os.path.isfile(os.path.join(folder_b, f))]

    # Iterate over every image in folder A
    for file_a in files_a:
        image_a_path = os.path.join(folder_a, file_a)
        
        # For each image in folder A, iterate over every image in folder B
        for file_b in files_b:
            image_b_path = os.path.join(folder_b, file_b)
            
            # Combine the images
            combine_images(image_a_path, image_b_path, output_dir, target_size)

# Specify your directories here
folder_a = 'F:\\dev\\space-ships\\resources\\shadowed'
folder_b = 'F:\\dev\\space-ships\\resources\\tiled'
output_directory = 'F:\\dev\\space-ships\\resources\\combined'

# Specify the target size
target_size = (256, 256)  # Width x Height

process_folders(folder_a, folder_b, output_directory, target_size)
