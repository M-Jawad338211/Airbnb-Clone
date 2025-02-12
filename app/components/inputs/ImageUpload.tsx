// 'use client';

// import { CldUploadWidget } from "next-cloudinary";
// import Image from "next/image";
// import { useCallback } from "react";
// import { TbPhotoPlus } from "react-icons/tb";


// declare global {
//     var cloudinary: any;
// }

// interface ImageUploadProps {
//     onChange: (value: string) => void;
//     value: string;
// }
// const ImageUpload: React.FC<ImageUploadProps> = ({
//     onChange,
//     value
// }) => {
//     // const handleUpload = useCallback((result: any) => {
//     //     onChange(result.info.secure_url);
//     // }, [onChange]);
//     const handleUpload = useCallback((result: any) => {
//         if (result.event === "success") {
//             onChange(result.info.secure_url);
//         } else if (result.event === "error") {
//             console.error("Upload Error:", result.info);  // This will log detailed error info
//         }
//     }, [onChange]);

//     return (
//         <CldUploadWidget
//             onUpload={handleUpload}
//             uploadPreset= "my_unsigned_preset"
//             options={{
//                 maxFiles: 1
//             }}
            
//         >
//             {({ open }) => {
//                 return (
//                     <div 
//                         onClick={() => open?.()}
//                         className="
//                           relative
//                           cursor-pointer
//                           hover:opacity-70
//                           transition
//                           border-dashed
//                           border-2
//                           p-20
//                           border-neutral-300
//                           flex
//                           flex-col
//                           justify-center
//                           items-center
//                           gap-4
//                           text-neutral-600  
//                             "
//                     >
//                         <TbPhotoPlus size={50} />
//                         <div className="font-semibold text-lg">Click to upload</div>
//                         {value && (
//                             <div 
//                                 className="absolute inset-0 w-full h-full"
//                             >
//                                  <Image 
//                                     alt ="upload"
//                                     fill
//                                     style={{ objectFit: 'cover' }}
//                                     src={value}
//                                  />
//                             </div>
//                         )}
//                     </div>
//                 )
//             }}
//         </CldUploadWidget>
//     );
// }
// export default ImageUpload;

'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleSuccess = useCallback((result: any) => {
    if (result.event === 'success') {
      console.log('Upload successful:', result.info); // Logging successful upload
      onChange(result.info.secure_url); // Set the image URL
    }
  }, [onChange]);

  const handleFailure = useCallback((error: any) => {
    console.error('Upload Error:', error); // Handle upload error
  }, []);

  return (
    <CldUploadWidget
      uploadPreset="my_unsigned_preset"
      options={{
        maxFiles: 1,
      }}
      onSuccess={handleSuccess} // Use onSuccess instead of onUpload
      onFailure={handleFailure} // Use onFailure for error handling
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
