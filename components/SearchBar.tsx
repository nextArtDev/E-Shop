'use client'
import { FC } from 'react'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { toast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'

interface SearchBarProps {}

const FormSchema = z.object({
  searchTerm: z.string().min(1, {
    message: 'لطفا عبارت مورد نظر خود را وارد کنید.',
  }),
})

const SearchBar: FC<SearchBarProps> = ({}) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchTerm: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true }
    )
    console.log(url)
    router.push(url)
    form.reset()
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }
  return (
    <div className=" flex items-center shadow-2xl ">
      <Dialog>
        <DialogTrigger asChild>
          <MagnifyingGlassIcon
            className="mr-4 h-6 w-6 cursor-pointer font-bold "
            aria-hidden="true"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md top-[25%] bg-background/10 backdrop-blur-sm  ">
          <div className="flex items-center gap-x-3">
            <div className="grid flex-1 gap-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="searchTerm"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="جست‌وجو"
                            className="my-6 bg-background/30 backdrop-blur-sm placeholder:text-black/60 "
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button
                        variant={'outline'}
                        type="submit"
                        size="sm"
                        className="w-1/2 mx-auto px-3 bg-indigo-600 text-white/80 my-8 "
                      >
                        جست‌وجو
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SearchBar
