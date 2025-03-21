import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProperty, uploadPhotos } from "../../api/propertyApi";

const UploadPhotos = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { id } = useParams();
    const [data, setData] = useState({});
    const nagative = useNavigate();

    useEffect(() => {
        if (id) {
            getPropertyDetail(id);
        }
    }, [id]);

    const getPropertyDetail = async (id) => {
        try {
            const res = await getProperty(id);
            const houseData = res.data;
            setData(houseData);
        } catch (err) {
            console.log(err);
        }
    }

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setError("Please select files to upload.");
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]); // Ensure the name matches your API
        }

        try {
            setUploading(true);
            setError(null);
            setSuccess(false);
            const res = await uploadPhotos(id, formData);
            alert(res.data.message);

            setSuccess(true);
            nagative("/owner");
        } catch (err) {
            setError("Failed to upload photos.");
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white p-6 shadow-md rounded-md">
            <h2 className="text-lg font-bold mb-3">Upload Property Photos</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Photos uploaded successfully!</p>}

            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full p-2 border rounded mb-3"
            />

            <button
                onClick={handleUpload}
                className={`p-2 rounded w-full text-white ${uploading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"}`}
                disabled={uploading}
            >
                {uploading ? "Uploading..." : "Upload Photos"}
            </button>

            {data.photos && data.photos.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Uploaded Photos:</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {data.photos.map((photo, index) => (
                            <div key={index} className="border p-2">
                                <img src={photo.path} alt={`Property photo ${index + 1}`} className="w-full h-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadPhotos;
