
import { Link } from 'react-router-dom';
import { StringConvert } from '../components/StringConvert';



const truncateText = (text, maxLength) => {
    if(text) {
      if (text.length <= maxLength) {
        return text;
      }
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };


const CarWithDriverCard = ({data}) => {
    const {id,banner_image,title,description,type,slug} = data
      const maxLength = 200;
      const truncatedText = truncateText(description, maxLength);

    return (
        <div className='BlogsCard relative shadow-custom border border-[#D4DEF1] rounded-3xl bg-white'>
            <Link className="" to={`/carwithdrivers/edit/${id}`}>
            <div className='BlogsCardMain p-4 grid grid-cols-1 gap-4 max-lg:grid-cols-1'>

                <div className="BlogsCard__leftRight pr-8">
                    <div className="h2 text-[1.25rem] capitalize font-MluvkaLight leading-[1.2] mb-2">{title}</div>
                    <div className='text-[#393946] text-[.8rem] leading-[1.5] mb-4'>{StringConvert(truncatedText)}</div>
                </div>
            </div>

                <div className='px-4 pb-3 flex flex-col '>
                        <div>

                    <span className=''>Type :</span>
                    <span className='text-primary font-MluvkaBold'> {type}</span>
                        </div>
                        <div>
                    <span className=''>Slug :</span>
                    <span className='text-primary font-MluvkaBold'> {slug}</span>
                    </div>
                    </div>
            </Link>
        </div>
    )
}

export default CarWithDriverCard
