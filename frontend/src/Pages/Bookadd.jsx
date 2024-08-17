import React, { lazy, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

const Navbar = lazy(() => import('../Components/Navbar'));
import app from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import Loader from '../Components/Loader';
const Loader =lazy(()=> import('../Components/Loader'));

const Bookadd = () => {
    const { register, handleSubmit, formState: { errors }, reset  } = useForm();
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [isadd, setisadd] = useState(false);
    const [issubmit,setissubmit]=useState(false);
    const user = useSelector((state) => state.user.user.email);
  
  
    const onSubmit = async (data) => {
        setisadd(true);
        setissubmit(true);
    
        try {
            // Convert relevant fields to uppercase
            const formattedData = {
                ...data,
                bookName: data.bookName.toUpperCase(),
                authorName: data.authorName.toUpperCase(),
                genre: data.genre.toUpperCase(),
                description: data.description.toUpperCase(),
            };
    
            const uploadedUrls = [];
    
            // Upload images one by one
            for (const image of images) {
                const storage = getStorage(app);
                const storageRef = ref(storage, `Book/${image.name}`);
    
                try {
                    const snapshot = await uploadBytesResumable(storageRef, image);
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    uploadedUrls.push(downloadURL);
                    setImageUrls((prevUrls) => [...prevUrls, downloadURL]); // Incrementally update the state
                } catch (error) {
                    console.error('Upload failed', error);
                    toast.error(`Image ${image.name} upload failed`);
                    throw error; // Exit the loop if any upload fails
                }
            }
    
            const alldata = {
                ...formattedData,
                images: uploadedUrls,
                userEmails:user 
                // Use the incrementally collected URLs
            };
           console.log(alldata);
            // Send data to the server
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(alldata),
            };
            const response = await fetch('http://localhost:3000/addbook', request);
            const result = await response.json();
            // console.log(result);

            if(result.message=="Error adding book"){
                toast.error("Error adding book");
            }else{
                toast.success("Book added successfully");
            }
    
            // Show success toast
            
    
            // Reset the form and states
            reset();
            setImages([]);
            setImageUrls([]);
    
        } catch (error) {
            console.error('Failed to upload images:', error);
    
            // Show error toast
            toast.error('An error occurred during the upload process.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            // Ensure loader is hidden
            setissubmit(false);
            setisadd(false);
          
        
            // console.log("Loader hidden");  // Debugging log to ensure this is reached
        }
        
    };
    
    
  
    const filechange = (e) => {
        const selectedFile = e.target.files[0];
        if (images.length < 3) {
            setImages((prevImages) => [...prevImages, selectedFile]);
        } else {
            toast.error('You can upload only 3 images!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        toast.success('Image deleted successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    return (
        <div className=''>
        <div class="absolute inset-0 -z-10 h-[165vh] xs:h-[140vh] md:h-[140vh] lg:h-[120vh] w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div>
                <Navbar />
            </div>
            {issubmit && <div className='h-[90vh]'>
                <Loader />
            </div>}
            {!issubmit && <div className="p-8 container md:w-[90vw] m-auto lg:w-[50vw]   my-auto  w-[100vw] mt-2 ">
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col lg:flex-row lg:space-x-4">
                        <div className="mb-4 w-full">
                            <label className="block text-gray-700 text-lg font-serif font-bold">
                                Book Name <span className='text-red-600'>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder='The lost life...'
                                {...register('bookName', { required: true })}
                                className="w-full p-2 border border-black rounded-2xl"
                            />
                            {errors.bookName && <span className="text-red-500">Book name is required</span>}
                        </div>

                        <div className="mb-4 w-full">
                            <label className="block text-gray-700 text-lg font-serif font-bold">
                                Author Name <span className='text-red-600'>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder='James Clear....'
                                {...register('authorName', { required: true })}
                                className="w-full p-2 border border-black rounded-2xl"
                            />
                            {errors.authorName && <span className="text-red-500">Author name is required</span>}
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:space-x-4">
                        <div className="mb-4 w-full">
                            <label className="block text-gray-700 text-lg font-serif font-bold">
                                Genre <span className='text-red-600'>*</span>
                            </label>
                            <select
                                {...register('genre', { required: true })}
                                className="w-full p-2 border border-black rounded-2xl"
                            >
                                <option value="">Select Genre</option>
                                <option value="fiction">Fiction</option>
                                <option value="non-fiction">Non-Fiction</option>
                                <option value="mystery">Mystery</option>
                                <option value="science-fiction">Science Fiction</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="biography">Biography</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.genre && <span className="text-red-500">Genre is required</span>}
                        </div>

                        <div className="mb-4 w-full">
                            <label className="block text-gray-700 text-lg font-serif font-bold">
                                Price <span className='text-red-600'>*</span>
                            </label>
                            <input
                                placeholder='9,XX'
                                type="number"
                                {...register('price', { required: true, min: 0 })}
                                className="w-full p-2 border border-black rounded-2xl"
                            />
                            {errors.price && <span className="text-red-500">Price is required and must be a positive number</span>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-serif font-bold">
                            Description <span className='text-red-600'>*</span>
                        </label>
                        <textarea
                            placeholder='This book is about ...'
                            {...register('description', {
                                required: true,
                                maxLength: 100,
                            })}
                            className="w-full p-2 border border-black rounded-2xl"
                            rows="3"
                        />
                        {errors.description && errors.description.type === 'required' && (
                            <span className="text-red-500">Description is required</span>
                        )}
                        {errors.description && errors.description.type === 'maxLength' && (
                            <span className="text-red-500">Description cannot exceed 100 words</span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-serif font-bold">
                            Images (Max 3) <span className='text-red-600'>*</span>
                        </label>
                        <input
                            type="file"
                            {...register('images', {
                                required: true,
                                validate: (files) => files.length <= 3,
                            })}
                            className="w-full p-2 rounded-xl font-serif"
                            multiple
                            accept="image/*"
                            onChange={filechange}
                        />
                        {errors.images && errors.images.type === 'required' && (
                            <span className="text-red-500">At least one image is required</span>
                        )}
                        {errors.images && errors.images.type === 'validate' && (
                            <span className="text-red-500">You can upload a maximum of 3 images</span>
                        )}
                    </div>

                    <div className="mb-4 flex xs:flex-col sm:flex-row w-full justify-around flex-wrap mx-2">
  {images.map((image, index) => (
    <div
      key={index}
      className="mb-4 flex items-center sm:flex-col sm:space-y-3 space-y-0 sm:space-x-0 justify-center sm:items-center mx-5"
    >
      <img
        src={URL.createObjectURL(image)}
        alt={`Uploaded ${index + 1}`}
        className="w-20 h-20 object-cover rounded-lg sm:mr-0 mr-4"
      />
      <button
        type="button"
        className="bg-red-500 text-white p-1 rounded mt-0 sm:mt-2"
        onClick={() => removeImage(index)}
      >
        Delete
      </button>
    </div>
  ))}
</div>



                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            disabled={isadd}
                            className={`w-1/2 p-2 mt-4 font-bold text-white rounded-xl ${isadd ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-800'} `}
                        >
                            {isadd ? 'Uploading...' : 'Submit'}
                        </button>
                    </div>

                    {isadd && (
                        <div className="flex justify-center mt-4">
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                        </div>
                    )}
                </form>
            </div>}
        </div>
    );
};


export default Bookadd;
