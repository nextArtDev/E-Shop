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
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

import { SafeUser } from '@/types/next-auth'
import { Order, Product, Review } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { Rating } from '@mui/material'
import { createReviewAction } from '@/actions/rating.action'
import { Loader } from 'lucide-react'

interface AddRatingProps {
  product: Product & { reviews: Review[] }
  user: (SafeUser & { orders: Order[] }) | null
}

const AddRating: FC<AddRatingProps> = ({ product, user }) => {
  const FormSchema = z.object({
    comment: z
      .string()
      .min(3, {
        message: 'نظر شما باید بیشتر از سه حرف باشد',
      })
      .max(280, {
        message: 'نظر شما نمی‌تواند بیشتر از 280 حرف باشد.',
      }),
    rating: z.string(),
    //   .min(1, { message: 'نمره شما نمی‌تواند کمتر از 1 باشد' })
    //   .max(5, { message: 'نمره شما نمی‌تواند بیشتر از 5 باشد.' }),
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: '',
      rating: '5',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    try {
      const result = await createReviewAction({
        comment: data.comment,
        rating: data.rating,
        user_id: user.id,
        productId: Number(product.id),
        path: pathname,
      })
      if (result) {
        return toast({ title: 'نظر شما منتشر شد.', variant: 'default' })
      }
      form.reset()
    } catch (error) {
      //   console.log(error)
      return toast({ title: `${error}`, variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="pt-4 flex items-center gap-4">
              <FormLabel className="justify-self-center self-center ">
                ستاره بدهید:
              </FormLabel>
              <FormControl>
                <Rating {...field} value={Number(field.value)} dir="ltr" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نظر</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="نظر خود را بنویسید..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading ? <Loader className="animate-spin w-4 h-4 " /> : 'ثبت نظر'}
        </Button>
      </form>
    </Form>
  )
}

export default AddRating
