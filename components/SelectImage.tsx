'use client'
import { ImageType } from '@/lib/colors'
import { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Input } from './ui/input'

interface SelectImageProps {
  item?: ImageType
  handleFileChange: (value: File) => void
}

const SelectImage: FC<SelectImageProps> = ({ item, handleFileChange }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.webp'] },
  })
  return (
    <div
      {...getRootProps}
      className="border-2 border-slate-400 p-2 border-dashed cursor-pointer tex-sm font-normal text-slate-400 flex items-center justify-center "
    >
      <input {...getInputProps} />
      {isDragActive ? (
        <p>عکس را در این قسمت رها کنید...</p>
      ) : (
        <p>+ {item?.color} عکس</p>
      )}
    </div>
  )
}

export default SelectImage
