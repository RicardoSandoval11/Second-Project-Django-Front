import { Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEntryStore } from '../../../hooks/useEntryStore';

export const DisplayTag = ({ tag }) => {

  return (
    <>
      <Link  
            sx={{ 
                backgroundColor:'gray', 
                color:'white', 
                m:1, 
                p:2, 
                mb:4,
                fontSize:15,
                textDecoration:'none',
                ':hover':{
                  opacity:0.8
                } 
            }} 
            href={`/entries/filter/${tag.id}`}
            >
            {tag.name}
        </Link>
    </>
  )
}
