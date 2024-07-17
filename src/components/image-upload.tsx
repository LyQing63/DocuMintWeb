/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EbxNk7YKElB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Label} from "@/components/tailwind/ui/label"
import {Input} from "@/components/tailwind/ui/input"
import {Textarea} from "@/components/tailwind/ui/textarea"
import {Button} from "@/components/tailwind/ui/button"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/tailwind/ui/form"
import {z} from "zod";
import {useEffect, useState} from "react";
import {AiService} from "@/api/services/API";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/tailwind/ui/dialog";

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

export default function ImageUpload(props) {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [ocrResult, setOcrResult] = useState("");
    const [OCROK, setOCROK] = useState(false);
    const [i, setI] = useState(0);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            img: undefined,
        },
    })

    const onSubmit = async (data) => {
        const img = data.img[0];
        // console.log(data.img[1]);
        AiService.OCRImage(img).then((res) => {
            setOCROK(true);
            const datas = res.data.data;
            const tmp = datas.map((item) => {
                return item.text;
            });
            setOcrResult(tmp);
            console.log(tmp.join('\n'));
        });
    };

    useEffect(() => {
        setI(1-i);
    }, [ocrResult]);

    return (
        <Dialog open={props.openOCR} onOpenChange={props.setOpenOCR}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>OCR</DialogTitle>
                    <DialogDescription>图片上传</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/*<Button variant="ghost" size="icon" onClick={() => setOpenOCR(false)} className="absolute top-4 right-4">*/}
                    {/*    <XIcon className="h-5 w-5" />*/}
                    {/*    <span className="sr-only">Close</span>*/}
                    {/*</Button>*/}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid w-full gap-4">
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="picture"></Label>
                                        <FormField
                                            control={form.control}
                                            name="img"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>

                                                    </FormControl>
                                                    <Input id="picture" type="file" accept='img/*'
                                                           className="hidden"
                                                           onBlur={field.onBlur}
                                                           name={field.name}
                                                           onChange={(e) => {
                                                               field.onChange(e.target.files);
                                                               setSelectedImage(e.target.files?.[0] || null);
                                                           }}
                                                           ref={field.ref}
                                                    />
                                                    <label htmlFor="picture"
                                                           className="cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl inline-block text-center">
                                                        选择文件
                                                    </label>
                                                    {!selectedImage ?
                                                        <div className="grid sm:grid-cols-1 gap-4 w-full mx-auto mt-4">
                                                            <img
                                                                src="/placeholder.svg"
                                                                alt="Selected Image"
                                                                width={400}
                                                                height={400}
                                                                className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800 transition-transform duration-300 ease-in-out hover:scale-105"
                                                            />
                                                        </div> :
                                                        <div className="grid sm:grid-cols-1 gap-4 w-full mx-auto mt-4">
                                                            <img
                                                                src={URL.createObjectURL(selectedImage)}
                                                                alt="Selected Image"
                                                                width={400}
                                                                height={400}
                                                                className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800 transition-transform duration-300 ease-in-out hover:scale-105"
                                                            />
                                                        </div>
                                                    }
                                                    {OCROK ? <Textarea
                                                        className="mt-2 mb-2 transition-all duration-300 ease-in-out"
                                                        key={i} value={ocrResult} readOnly></Textarea> : <></>}
                                                    <div className="flex justify-center mt-4">
                                                        <Button type='submit'
                                                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">上传图片</Button>
                                                    </div>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>

    )
}
