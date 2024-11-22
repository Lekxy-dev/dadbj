"use client"

import Avatar from "@/app/Component/Avatar";
import Heading from "@/app/Component/Heading";
import { Rating } from "@mui/material";
import moment from "moment";

interface ListRatingProps {
    produc: any;
}


const ListRating:React.FC<ListRatingProps> = ({
    produc
}) => {
    return ( <div>
        <Heading title="Product Review" />
        <div className="text-sm mt-2">
           {produc.reviews && produc.reviews.map((review:any) => {
            return <div key={review.id} className="max-w-[300px]">
                  <div className="flex gap-2">
                    <Avatar src={review.user.image}/>
                    <div className="font-semibold">{review?.user.name}</div>
                    <div className="font-light">{moment(review.createdDate).fromNow()}</div>
                  </div>
                  <div className="mt-2">
                       <Rating value={review.rating} readOnly/>
                       <div className="ml-2">{review.comment}</div>
                       <hr className="mt-4 mb-4"/>
                  </div>
            </div>
           })}
        </div>
    </div> );
}
 
export default ListRating;