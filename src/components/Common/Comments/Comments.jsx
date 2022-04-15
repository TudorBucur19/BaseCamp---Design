import React, { useContext } from 'react';

import { CampgroundsContext } from 'contexts/CampgroundsContext';
import { AuthenticationContext } from 'contexts/AuthenticationContext';
import CommentForm from 'components/forms/CommentForm';
import CommentItem from 'components/Common/Comments/CommentItem';

const Comments = ({comments, id}) => {
    const { handleCommentsUpdate } = useContext(CampgroundsContext);
    const { user } = useContext(AuthenticationContext);

    return ( 
        <>
            {comments.map((comment, index) => 
                <CommentItem 
                key={index}
                comment={comment}
                removeComment={handleCommentsUpdate}
                campgroundID = {id}
                />
            )}

            {user &&
                <CommentForm campID={id}/>
            }
        </>
     );
}
 
export default Comments;