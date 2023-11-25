import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { app } from '../../firebase.init';
import toast from '../components/Toast/Toast';

const storage = getStorage(app);

const useUpload = () => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [percent, setPercent] = useState(0);
    
    const uploadDoc = (file)=>{
       
            if(!file) return new Error('File not found!');
            const storageRef = ref(storage, `files/${file.name}`);

            const uploadTask = uploadBytesResumable(storageRef, file);
            setLoading(true)
            uploadTask.on("state_changed", (snapshot)=>{
                const per = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setPercent(per)
            }, 
            (err)=>{
                setLoading(false)
                toast.error({title: 'Upload failed!', message: "Please try again."})
            },
            ()=>{
                // download url
                getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                    setLoading(false)
                    setImageUrl(url);
                });
            }
            )
        return Promise.resolve(imageUrl)
    }

    return {uploadDoc, percent, imageUrl, loading}
};

export default useUpload;