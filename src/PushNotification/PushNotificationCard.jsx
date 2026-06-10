import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useDelete from '../customHooks/useDelete';

const truncateText = (text, maxLength) => {
  if (!text) {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
};

const PushNotificationCard = ({ data, alldata, deleted, permission }) => {
  const { id, image, title, notification, data: payloadData } = data;
  const [resDelete, apiMethodDelete] = useDelete();

  const handleDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete?',
      buttons: true,
      icon: 'warning',
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        apiMethodDelete(`admin/notifications/${id}`);
      }
    });
  };

  useEffect(() => {
    if (resDelete.data) {
      const { message, status } = resDelete.data;
      if (status === 'false') {
        toast.error(message);
        return;
      }

      deleted(alldata.filter((item) => item.id !== id));
      toast.success(message ?? 'Notification deleted successfully');
    }
  }, [alldata, deleted, id, resDelete.data]);

  useEffect(() => {
    if (resDelete.error) {
      toast.error(resDelete?.error?.response?.data?.message ?? 'Failed to delete notification');
    }
  }, [resDelete.error]);

  const check = (module, action) => permission?.[module]?.includes(action);
  const payloadPreview =
    typeof payloadData === 'string' ? payloadData : JSON.stringify(payloadData ?? {}, null, 2);

  return (
    <div className='BlogsCard relative shadow-custom border border-[#D4DEF1] rounded-3xl bg-white overflow-hidden'>
      {check('PushNotification', 'PushNotification Delete') && (
        <div
          className='closeButton cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[.7rem] right-[.7rem] grid place-items-center rounded-[.7rem] z-10'
          onClick={handleDelete}
        >
          <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      <Link className="BlogsCardMain p-4 grid grid-cols-[4fr,6fr] gap-4 max-lg:grid-cols-1" to={`/push-notification/edit/${id}`}>
        <div className="BlogsCard__left max-lg:mb-4">
          {image ? (
            <img src={image} className='w-full h-[10rem] object-cover rounded-3xl' alt={title || 'notification'} />
          ) : (
            <div className='w-full h-[10rem] rounded-3xl bg-[#EFF4FD] border border-dashed border-[#D4DEF1] flex items-center justify-center text-[#7D8CA7] text-sm'>
              No Image
            </div>
          )}
        </div>

        <div className="BlogsCard__leftRight pr-8">
          <div className="h2 text-[1.25rem] capitalize font-MluvkaLight leading-[1.2] mb-2">{title}</div>
          <div className='text-[#393946] text-[.8rem] leading-[1.5] mb-4'>{truncateText(notification, 140)}</div>
          {/* <pre className='bg-[#EFF4FD] text-[#393946] text-[.72rem] leading-[1.5] p-3 rounded-2xl whitespace-pre-wrap break-words'>
            {truncateText(payloadPreview, 220)}
          </pre> */}
        </div>
      </Link>
    </div>
  );
};

export default PushNotificationCard;
