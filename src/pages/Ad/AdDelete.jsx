import React, { useEffect, useState } from 'react'
import { deleteAd, getAds } from '../../api/ad';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';

const AdDelete = () => {
    const [adProducts, setAdProducts] = useState();
    const [loading, setLoading] = useState(true);

    const fetchAds = () => {
        setLoading(true);
        getAds()
            .then((data) => {
                setAdProducts([...data]);
                console.log(adProducts)
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
            setLoading(false);
            });
        };
        
        const handleDeleteAd = (id) => { 
        deleteAd(id)
            .then((data) => {
                setAdProducts((prevAds) => prevAds.filter((ad) => ad.id !== id));
                toast.success('Ad deleted.')
            })
            .catch((error) => {
                toast.error(error.message)
            });
    }

    useEffect(() => {
        fetchAds();
    },[]);

    
  return (
    <div className='container-fluid'>
        {
            loading ? (
                <Loader/>
            ) : (
                <div className='scrollable-content vh-85'>
                 <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Provider</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adProducts.map((ad) => (
                                <tr key={ad.id}>
                                    <td>{ad.title}</td>
                                    <td>{ad.provider}</td>
                                    <td>
                                        <img className='img-fluid' style={{maxHeight:'50px'}}src={`${process.env.REACT_APP_BACKEND_URL}/${ad.image_url}`} alt={ad.title} />
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteAd(ad.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
    </div>
  );
};

export default AdDelete;