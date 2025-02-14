'use client';

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleSuccess = useCallback(
    (result: { event: string; info: CloudinaryUploadWidgetInfo }) => {
      if (result.event === 'success' && result.info.secure_url) {
        console.log('Upload successful:', result.info); // Logging successful upload
        onChange(result.info.secure_url); // Set the image URL
      }
    },
    [onChange]
  );

  const handleFailure = useCallback((error: unknown) => {
    console.error('Upload Error:', error); // Handle upload error
  }, []);

  return (
    <CldUploadWidget
      uploadPreset="my_unsigned_preset"
      options={{
        maxFiles: 1,
      }}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed
              border-2
              p-20
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600  
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
