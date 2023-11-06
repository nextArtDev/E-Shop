'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FC, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import FileInput from '@/components/FileInput'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { FileUp, Trash2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

interface AddProductFormProps {}

const AddProductForm: FC<AddProductFormProps> = ({}) => {
  const [isLoading, setLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const onDrop = (acceptedFiles: any) => {
    // Handle the dropped files here
    console.log(acceptedFiles)
    setFiles(acceptedFiles)
  }
  const MAX_IMAGE_SIZE = 5242880 // 5 MB
  const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/jpg',
  ]
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: 'نام محصول حداقل باید دو حرف باشد.',
      })
      .max(30, {
        message: 'نام محصول نمی‌تواند بیش از 30 حرف باشد.',
      }),
    description: z.string(),
    brand: z.string(),
    category: z.string(),
    inStock: z.boolean(),
    // images: z.any(),
    images: z
      .custom<FileList>((val) => val instanceof FileList, 'Required')
      .refine((files) => files.length > 0, `Required`)
      .refine((files) => files.length <= 5, `Maximum of 5 images are allowed.`)
      .refine(
        (files) =>
          Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
        `Each file size should be less than 5 MB.`
      )
      .refine(
        (files) =>
          Array.from(files).every((file) =>
            ALLOWED_IMAGE_TYPES.includes(file.type)
          ),
        'Only these types are allowed .jpg, .jpeg, .png and .webp'
      ),
    price: z.string(),
  })
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      category: '',
      inStock: false,
      // images: [],
      price: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  // console.log(form)
  return (
    <div className="py-8 mx-auto w-[90%] md:w-[80%] max-w-7xl">
      <h2 className="text-xl font-semibold text-center">اضافه کردن محصول</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام محصول</FormLabel>
                <FormControl>
                  <Input placeholder="نام محصول" {...field} />
                </FormControl>
                {/* <FormDescription>
                  این نام در صفحه محصول نمایش داده می‌شود.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>توضیحات محصول</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=" توضیحات محصول را بنویسید..."
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  این توضیحات در صفحه محصول نمایش داده می‌شود.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>برند</FormLabel>
                <FormControl>
                  <Input placeholder="برند محصول" {...field} />
                </FormControl>
                {/* <FormDescription>
                  این برند در صفحه محصول نمایش داده می‌شود.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>دسته محصول</FormLabel>
                <FormControl>
                  <Input placeholder="دسته محصول" {...field} />
                </FormControl>
                {/* <FormDescription>
                  این دسته بندی در صفحه محصول نمایش داده می‌شود.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>وضعیت </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    placeholder="وضعیت محصول"
                    // {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  این وضعیت در صفحه محصول نمایش داده می‌شود.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field: { onChange }, ...field }) => (
              <FormItem>
                <FormLabel className="mx-auto cursor-pointer bg-gray-200 rounded-xl flex flex-col justify-center gap-4 items-center border-[4px] border-black/40 border-dashed w-full h-32 shadow-2xl ">
                  {/* <div className=""> */}
                  عکسهای محصول
                  <FileUp size={42} className="opacity-75" />
                  {/* </div> */}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    multiple={true}
                    disabled={form.formState.isSubmitting}
                    {...field}
                    onChange={(event) => {
                      // Triggered when user uploaded a new file
                      // FileList is immutable, so we need to create a new one
                      const dataTransfer = new DataTransfer()

                      // Add old images
                      // if (images) {
                      //   Array.from(images).forEach((image) =>
                      //     dataTransfer.items.add(image)
                      //   )
                      // }

                      // Add newly uploaded images
                      Array.from(event.target.files!).forEach((image) =>
                        dataTransfer.items.add(image)
                      )

                      // Validate and update uploaded file
                      const newFiles = dataTransfer.files
                      setFiles(Array.from(newFiles))

                      onChange(newFiles)
                    }}
                  />

                  {/* https://stackblitz.com/edit/input-file-react-hook-form?file=src%2FForm.js */}
                  {/* <div
                    className="flex justify-center items-center w-36 h-36 bg-gray-400 rounded-md border border-dashed "
                    {...getRootProps()}
                  >
                    <Input
                      type="file"
                      multiple
                      placeholder="نام محصول"
                      {...field}
                      {...getInputProps()}
                      className="w-32 h-32 bg-gray-500"
                    />
                    {isDragActive ? (
                      <p>عکس را اینجا رها کنید</p>
                    ) : (
                      <p className="text-sm text-center">
                        {' '}
                        عکس را اینجا رها کنید، یا برای بارگزاری عکس کلیک کنید{' '}
                      </p>
                    )}
                  </div> */}
                  {/* <FileInput
                    // {...field}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    multiple
                    name="images"
                    // mode="append"
                  /> */}
                </FormControl>
                <FormDescription className="flex justify-center items-center">
                  {!!files?.length && (
                    <div className="flex flex-wrap mt-4">
                      {files.map((file, i) => {
                        return (
                          <div className=" relative " key={i}>
                            <Image
                              src={URL.createObjectURL(file)}
                              alt=""
                              width={90}
                              height={90}
                              className="m-2 rounded-3xl border-white border-2 shadow-2xl"
                            />
                            {/* <Trash2
                              onClick={() => {
                                const newf = files.filter(
                                  (f, index) => f !== file
                                )
                                // console.log(newf)
                                setFiles(newf)
                              }}
                              className="cursor-pointer absolute -bottom-4 left-1/2 text-white z-20 bg-red-500 rounded-full p-0.5"
                            /> */}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>قیمت محصول</FormLabel>
                <FormControl>
                  <Input placeholder="قیمت محصول" {...field} />
                </FormControl>
                {/* <FormDescription>
                  این قیمت در صفحه محصول نمایش داده می‌شود.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full py-6" disabled={isLoading} type="submit">
            اضافه کردن محصول
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AddProductForm
