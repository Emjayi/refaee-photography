'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/utils/send-email';
import { Button } from './ui/button';
import { Loader, MessageSquare } from 'lucide-react'; // Importing icons from Lucide React
import Link from 'next/link';

export type FormData = {
    name: string;
    email: string;
    message: string;
};

const Contact: FC = () => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(data: FormData) {
        setIsLoading(true);
        try {
            await sendEmail(data);
            alert('Form submitted successfully!');
            reset(); // Reset the form fields
        } catch (error) {
            console.error(error);
            alert('There was an error submitting the form.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-5'>
                <label
                    htmlFor='name'
                    className='mb-3 block text-base font-medium text-black'
                >
                    Full Name
                </label>
                <input
                    type='text'
                    placeholder='Full Name'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                    {...register('name', { required: true })}
                />
            </div>
            <div className='mb-5'>
                <label
                    htmlFor='email'
                    className='mb-3 block text-base font-medium text-black'
                >
                    Email Address
                </label>
                <input
                    type='email'
                    placeholder='example@domain.com'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                    {...register('email', { required: true })}
                />
            </div>
            <div className='mb-5'>
                <label
                    htmlFor='message'
                    className='mb-3 block text-base font-medium text-black'
                >
                    Message
                </label>
                <textarea
                    rows={4}
                    placeholder='Type your message'
                    className='w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                    {...register('message', { required: true })}
                ></textarea>
            </div>
            <div className='flex items-center justify-center space-x-4'>
                <Button type='submit' disabled={isLoading} className='flex items-center'>
                    {isLoading ? (
                        <>
                            <Loader className='animate-spin mr-2 h-5 w-5' />
                            Submitting...
                        </>
                    ) : (
                        'Submit'
                    )}
                </Button>
                <Link href="https://Wa.me/989152027577">
                    <>
                        <Button
                            type='button'
                            className='flex items-center bg-green-500 hover:bg-green-600'
                        >
                            <MessageSquare className='mr-2 h-5 w-5' />
                            WhatsApp Business
                        </Button>
                    </>
                </Link>
            </div>
        </form>
    );
};

export default Contact;
