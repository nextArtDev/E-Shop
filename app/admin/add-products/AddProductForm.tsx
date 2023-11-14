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
import { FC, useCallback, useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import FileInput from '@/components/FileInput'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { FileUp, Loader, Trash2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { categories } from '@/lib/categories'
import CategoryInput from '@/components/CategoryInput'
import { ImageType, colors } from '@/lib/colors'
import SelectColor from '@/components/SelectColor'
import {
  createProductAction,
  uploadImagesAction,
} from '@/actions/product.actions'
import { uploadToS3 } from '@/lib/uploadToS3'
import { toast } from '@/components/ui/use-toast'
import { usePathname, useRouter } from 'next/navigation'
import { prisma } from '@/lib/prisma'

interface AddProductFormProps {}

const AddProductForm: FC<AddProductFormProps> = ({}) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadedImagesUrl, setUploadedImagesUrl] = useState<string[]>([])

  // const onDrop = (acceptedFiles: any) => {
  //   // Handle the dropped files here
  //   console.log(acceptedFiles)
  //   setFiles(acceptedFiles)
  // }
  const MAX_IMAGE_SIZE = 5242880 // 5 MB
  const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/jpg',
  ]
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
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
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true)
    try {
      const productResults = await createProductAction(
        JSON.stringify({ ...values, path: pathname })

        // images: uploadedImages,
      )
      // console.log(productResults?.id)
      if (!productResults) {
        return toast({
          title: 'مشکلی پیش آمده، لطفا بعدا امتحان کنید.',
          variant: 'destructive',
        })
      }
      for (const file of files) {
        const result = await uploadToS3(file, productResults.id)
        // setUploadedImagesUrl((prev) => [...prev, result])
      }
      form.reset()

      toast({
        title: 'محصول ایجاد شد.',
        variant: 'default',
      })
      setFiles([])
      router.refresh()
    } catch (error) {
      console.log(error)
      toast({
        title: 'مشکلی پیش آمده، لطفا بعدا امتحان کنید.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }

    // let uploadedImages: string[] = []

    //@ts-ignore
    // values.images = uploadedImages
  }
  // async function uploadImage(files: File[]) {
  //   for (const file of files) {
  //     console.log('file', file)
  //     const result = await uploadImagesAction(file)
  //     console.log('images', result)
  //   }
  // }

  // Custom images field
  // const [images, setImages] = useState<ImageType[] | null>()
  // const [isProductCreated, setIsProductCreated] = useState(false)

  // useEffect(() => {
  //   if (images && images.length > 0) {
  //     form.setValue('images', images, {
  //       shouldDirty: true,
  //       shouldTouch: true,
  //       shouldValidate: true,
  //     })
  //   }
  // }, [images])

  // useEffect(() => {
  //   if (isProductCreated) {
  //     form.reset()
  //     setImages(null)
  //     setIsProductCreated(false)
  //   }
  // }, [isProductCreated])

  // const addImageToState = useCallback((value: ImageType) => {
  //   setImages((prev) => {
  //     if (!prev) {
  //       return [value]
  //     }
  //     return [...prev, value]
  //   })
  // }, [])
  // const removeImageFromState = useCallback((value: ImageType) => {
  //   setImages((prev) => {
  //     if (prev) {
  //       const filteredImages = prev.filter((item) => item.color !== value.color)
  //       return filteredImages
  //     }
  //     return prev
  //   })
  // }, [])
  // console.log('images', images)
  // Custom field in react-hook-form
  // const category = form.watch('category')
  // const setCustomValue = (id: string, value: any) => {
  //   // form.setValue(id, value, {
  //   form.setValue('category', value, {
  //     shouldDirty: true,
  //     shouldTouch: true,
  //     shouldValidate: true,
  //   })
  // }

  return (
    <div className="py-8 mx-auto w-[90%] md:w-[80%] max-w-7xl">
      <h2 className="text-black text-xl font-semibold text-center">
        اضافه کردن محصول
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 text-black"
        >
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
          {/* <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>دسته محصول</FormLabel>
                <FormControl>
                  <div className="grid  grid-cols-2 gap-3 md:grid-cols-3 max-h-[50vh] overflow-y-auto ">
                    {categories.map((item) => {
                      if (item.label === 'همه') return
                      return (
                        <div key={item.label} className="col-span">
                          <CategoryInput
                            onClick={(category) =>
                              setCustomValue('category', category)
                            }
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                          />
                        </div>
                      )
                    })}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>دسته‌بندی</FormLabel>
                <Select
                  dir="rtl"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="یک دسته بندی را برای محصول انتخاب کنید." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => {
                      if (category.label === 'همه') return
                      const { label, icon: Icon } = category
                      return (
                        <SelectItem key={label} value={label}>
                          <span className="flex justify-center items-center gap-2">
                            <Icon />
                            {label}
                          </span>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
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

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field: { onChange }, ...field }) => (
              <FormItem>
                <FormLabel className="mx-auto cursor-pointer bg-gray-100 rounded-xl flex flex-col justify-center gap-4 items-center border-2 border-black/40 border-dashed w-full h-32 shadow-md ">
                  عکسهای محصول
                  <FileUp size={42} className="opacity-60" />
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    multiple={true}
                    disabled={form.formState.isSubmitting}
                    {...field}
                    onChange={async (event) => {
                      // Triggered when user uploaded a new file
                      // FileList is immutable, so we need to create a new one
                      const dataTransfer = new DataTransfer()

                      // Add old images
                      if (files) {
                        Array.from(files).forEach((image) =>
                          dataTransfer.items.add(image)
                        )
                      }

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
          {/* <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  رنگهای موجود محصول و عکسهای مربوط به آن را بارگزاری کنید
                </FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 gap-3">
                    {colors.map((item, index) => (
                      <SelectColor
                        key={index}
                        item={item}
                        addImageToState={() => {}}
                        removeImageFromState={() => {}}
                        isProductCreated={isProductCreated}
                      />
                    ))}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}
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
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              ' اضافه کردن محصول'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AddProductForm
