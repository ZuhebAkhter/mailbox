import React, {  useState } from "react";
import {
  Col,
  Container,
  Row,
  Stack,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import ComposeModal from "../Modals/ComposeModal";
import { Link } from "react-router-dom";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { deletMessage } from "../../Store/MessageSlice";

const dummymails=[
  {
    "id": "a1",
    "rb": "advertiser1@example.com",
    "sub": "Special Offer",
    "text": "This are Dummy Mails just For Looks",
    "read": true
  },
  {
    "id": "b2",
    "rb": "advertiser2@example.com",
    "sub": "Flash Sale Alert",
    "text": "However You Can Compose mails in real by making dummy account and that mails you can view.",
    "read": true
  },
  {
    "id": "c3",
    "rb": "Dummy Accounts",
    "sub": "New Product Launch",
    "text": "test@test.com and zuheb@gmail.com with password (1111111)",
    "read": true
  },
  {
    "id": "d4",
    "rb": "advertiser4@example.com",
    "sub": "Exclusive Deal",
    "text": "Only for our valued customers: Get a free gift with every purchase!",
    "read": true
  },
  {
    "id": "e5",
    "rb": "advertiser5@example.com",
    "sub": "Weekend Special",
    "text": "Enjoy your weekend with our delicious food at discounted prices.",
    "read": true
  },
  {
    "id": "f6",
    "rb": "advertiser6@example.com",
    "sub": "Travel Offer",
    "text": "Plan your dream vacation with our unbeatable travel deals!",
    "read": true
  },
  {
    "id": "g7",
    "rb": "advertiser7@example.com",
    "sub": "Tech Gadgets",
    "text": "Upgrade your tech game with the latest gadgets in town!",
    "read": true
  },
  {
    "id": "h8",
    "rb": "advertiser8@example.com",
    "sub": "Fashion Trends",
    "text": "Stay stylish with our trendy clothing collection.",
    "read": true
  },
  {
    "id": "i9",
    "rb": "advertiser9@example.com",
    "sub": "Health and Fitness",
    "text": "Get fit and healthy with our fitness equipment and nutrition products.",
    "read": true
  },
  {
    "id": "j10",
    "rb": "advertiser10@example.com",
    "sub": "Home Decor",
    "text": "Elevate your living space with our elegant home decor items.",
    "read": true
  },
  {
    "id": "k11",
    "rb": "advertise11@example.com",
    "sub": "Book Lovers",
    "text": "Explore a world of books with our extensive collection.",
    "read": true
  },
  {
    "id": "l12",
    "rb": "advertise12@example.com",
    "sub": "Car Enthusiasts",
    "text": "Discover the latest cars and accessories for car enthusiasts.",
    "read": true
  },
  {
    "id": "m13",
    "rb": "advertise13@example.com",
    "sub": "Entertainment",
    "text": "Stay entertained with our streaming services and entertainment packages.",
    "read": true
  },
  {
    "id": "n14",
    "rb": "advertise14@example.com",
    "sub": "Luxury Watches",
    "text": "Elevate your style with our luxurious collection of watches.",
    "read": true
  },
  {
    "id": "o15",
    "rb": "advertise15@example.com",
    "sub": "Art and Crafts",
    "text": "Unleash your creativity with our arts and crafts supplies.",
    "read": true
  },
  {
    "id": "p16",
    "rb": "advertise16@example.com",
    "sub": "Outdoor Adventures",
    "text": "Embark on exciting outdoor adventures with our gear and equipment.",
    "read": true
  },
  {
    "id": "q17",
    "rb": "advertise17@example.com",
    "sub": "Gourmet Delights",
    "text": "Indulge in gourmet delights with our fine dining offers.",
    "read": true
  },
  {
    "id": "r18",
    "rb": "advertise18@example.com",
    "sub": "Pet Lovers",
    "text": "Spoil your pets with our range of pet products and accessories.",
    "read": true
  },
  {
    "id": "s19",
    "rb": "advertise19@example.com",
    "sub": "DIY Projects",
    "text": "Fuel your creativity with DIY project kits and supplies.",
    "read": true
  },
  {
    "id": "t20",
    "rb": "advertise20@example.com",
    "sub": "Sports Enthusiasts",
    "text": "Gear up for your favorite sports with our sports equipment.",
    "read": true
  },
  {
    "id": "u21",
    "rb": "advertise21@example.com",
    "sub": "Beauty Essentials",
    "text": "Enhance your beauty with our range of beauty and skincare products.",
    "read": true
  },
  {
    "id": "v22",
    "rb": "advertise22@example.com",
    "sub": "Tech Savvy",
    "text": "Stay ahead in the tech world with our cutting-edge tech gadgets.",
    "read": true
  }
]


const Home = (props) => {
  const [show, setShow] = useState(false);

  const messSlice=useSelector(state => state.message.Messages)
  

  

  const dispatch=useDispatch();

  const showModalHandler = () => {
    setShow(true);
  };
  const hideModalHandler = () => {
    setShow(false);
  };
  const email=localStorage.getItem('user')
  const emailofUser=email?.split(/[@.]/).join("");

  const messCheckHandler=async(id)=>{

    
    await fetch(`https://emailclient-16191-default-rtdb.firebaseio.com/${emailofUser}/${id}.json`,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        read: true,
      }),
  
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to mark message as read');
      }
      else{
        console.log(response.json)
      }
      
    })
    .catch(error => {
      console.error('Error marking message as read:', error);
    });
  }
 
  const deleteMessageHandler=async(id)=>{
        await fetch(`https://emailclient-16191-default-rtdb.firebaseio.com/${emailofUser}/${id}.json`,{
          method:'DELETE',
    
        })
        
        dispatch(deletMessage(id))
        }
        const deletedummyMessageHandler=(id)=>{
          dummymails.filter((ele)=>ele.id !== id)
        

        }
  return (
    <Container fluid style={{height:'100vw'}}>
      <Row className="h-100">
        <Col sm={2}>
          <Button
            className="mb-4 mt-2 ms-5 px-4  py-3"
            onClick={showModalHandler}
          >
            <i className="bi bi-pencil"></i> Compose
          </Button>
          {show && (
            <ComposeModal show={showModalHandler} hide={hideModalHandler} />
          )}

          <ListGroup>
            <ListGroup.Item ><i className="bi bi-messenger me-2"></i>Inbox
</ListGroup.Item>
            <ListGroup.Item><i className="bi bi-star me-2"></i>Starred</ListGroup.Item>
            <ListGroup.Item><Link className="link-underline link-underline-opacity-0 text-dark" to={'/sent'}><i className="bi bi-upload me-2"></i>Sent</Link></ListGroup.Item>

            <ListGroup.Item><i className="bi bi-stopwatch me-2"></i>Snoozed</ListGroup.Item>
            <ListGroup.Item><i className="bi bi-file-earmark-medical me-2"></i>Drafts</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={10} >
          <form className="d-flex mt-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          <Card className="mt-4 py-0" style={{ width: "77rem" }}>
            <ListGroup variant="flush">
              {messSlice?.map((ele) => (
                
                  ele.read ? 

                  <Stack key={ele.id}  className="border" direction="horizontal" gap={5}>
                    <div className="col-2 ps-1"><Link className="link-underline link-underline-opacity-0 text-dark" onClick={()=>{messCheckHandler(ele.id)}}  to={`/welcome/${ele.id}`}>{ele.rb}</Link></div>
                    <div id="card" className="p-2">
                      {ele.text}

                    </div>
                    <div className="ms-auto">
                    <Button onClick={()=>{deleteMessageHandler(ele.id)}} className="me-auto py-2" variant="danger"><i className="bi bi-trash"></i></Button></div>
                  </Stack> :
                   <Stack key={ele.id}  className="border" direction="horizontal" gap={5}>
                   <div className="col-2 ps-1"> <i className="bi bi-1-circle-fill"></i><Link className="link-underline link-underline-opacity-0 text-dark ms-2" onClick={()=>{messCheckHandler(ele.id)}}  to={`/welcome/${ele.id}`}>{ele.rb}</Link></div>
                   <div id="card" className="p-2">
                     {ele.text}

                   </div>
                   <div className="ms-auto">
                   <Button onClick={()=>{deleteMessageHandler(ele.id)}} className="me-auto py-2" variant="danger"><i className="bi bi-trash"></i></Button></div>
                 </Stack> 

                  
                
               ))} 
                
            </ListGroup>
            <ListGroup variant="flush">
              {dummymails?.map((ele) => (
                
                   

                 
                   <Stack key={ele.id}  className="border" direction="horizontal" gap={5}>
                   <div className="col-2 ps-1"> <Link className="link-underline link-underline-opacity-0 text-dark ms-2" onClick={()=>{messCheckHandler(ele.id)}}  to={`/welcome/${ele.id}`}>{ele.rb}</Link></div>
                   <div id="card" className="p-2">
                     {ele.text}

                   </div>
                   <div className="ms-auto">
                   <Button onClick={()=>{deletedummyMessageHandler(ele.id)}} className="me-auto py-2" variant="danger"><i className="bi bi-trash"></i></Button></div>
                 </Stack> 

                  
                
               ))} 
                
            </ListGroup>
           
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
