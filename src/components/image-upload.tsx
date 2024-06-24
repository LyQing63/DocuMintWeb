/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EbxNk7YKElB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardContent } from "@/components/tailwind/ui/card"
import { Label } from "@/components/tailwind/ui/label"
import { Input } from "@/components/tailwind/ui/input"
import { Button } from "@/components/tailwind/ui/button"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/tailwind/ui/form"
import {z} from "zod";
import {useEffect, useState} from "react";
import {AiService} from "@/api/services/API";
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

const FormSchema = z.object({
    img: z
        .any()
        .refine((files) => {
            return files?.[0]?.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
});

export default function ImageUpload() {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            img: undefined,
        },
    })

    const onSubmit = async (data) => {
        const img = data.img[0];
        console.log(data.img[1]);
        AiService.OCRImage(img);
    };

    return (
        <Card className="max-w-md mx-auto absolute z-50 left-0 top-0 right-0 bottom-0 m-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <div className="font-bold text-2xl">图片上传</div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full gap-4">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="picture">Select Image</Label>
                                <FormField
                                    control={form.control}
                                    name="img"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>

                                            </FormControl>
                                            <Input id="picture" type="file" accept='img/*'
                                                   className="border-2 border-gray-200 rounded p-1"
                                                   onBlur={field.onBlur}
                                                   name={field.name}
                                                   onChange={(e) => {
                                                       field.onChange(e.target.files);
                                                       setSelectedImage(e.target.files?.[0] || null);
                                                   }}
                                                   ref={field.ref}
                                            />
                                            {/* <FormDescription>This is your public display email.</FormDescription> */}
                                            {!selectedImage ? <div className="grid sm:grid-cols-1 gap-4 w-full mx-auto">
                                                    <img
                                                        src="/placeholder.svg"
                                                        alt="Selected Image"
                                                        width={600}
                                                        height={600}
                                                        className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                                                    />
                                                </div> :
                                                <div className="grid sm:grid-cols-1 gap-4 w-full mx-auto">
                                                    <img
                                                        src={URL.createObjectURL(selectedImage)}
                                                        alt="Selected Image"
                                                        width={600}
                                                        height={600}
                                                        className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                                                    />
                                                </div>
                                            }
                                            <div className="flex justify-center">
                                                <Button type='submit'
                                                        className="bg-blue-500 text-white py-2 px-4 rounded">上传图片</Button>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                </form>
            </Form>
        </Card>
    )
}
