import React, { useEffect } from "react";
import { Button, Container, FormControl, Row, Col, Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Navbar from "../components/ourNavbar"
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_PRODUCT, SET_AMAZON_PRODUCT, SET_BESTBUY_PRODUCT, LOADING, TRACK_PRODUCT } from "../utils/actions";
import API from "../utils/API";
import { Link } from "react-router-dom";
import "./assets/product.css"

const Product = props => {

    const [state, dispatch] = useStoreContext();

    console.log("Best buy state price", state)

    useEffect(() => {
        getProduct()
        getAmazon();
        getBestBuy();
    }, []);

    const getProduct = () => {
        API.getProductInfoWalmart(props.match.params.itemId)
            .then(res => {
                dispatch({ type: LOADING })
                dispatch({ type: SET_CURRENT_PRODUCT, product: { name: res.data.name, image: res.data.largeImage, description: res.data.shortDescription, price: res.data.salePrice, upc: res.data.upc, itemId: res.data.itemId, link: res.data.productUrl } })
            })
            .catch(err => console.log(err))
    };

    const getAmazon = () => {
        API.getProductInfoAmazon(props.match.params.upc)
        .then(res => {
            if(res.data.product){
                dispatch({type: LOADING})
                dispatch({type: SET_AMAZON_PRODUCT, product:{name:res.data.product.title, link:res.data.product.link, price:res.data.product.buybox_winner.price.raw}})
            }
            console.log("amazon", res.data.product.buybox_winner.price.value)
            
        })
        .catch(err => console.log(err))
    };

    const getBestBuy = () => {
        API.getProductInfoBestbuy(props.match.params.upc)
            .then(res => {
                console.log(res.data.products)
                if (res.data.products.name){
                    dispatch({ type: LOADING })
                    dispatch({ type: SET_BESTBUY_PRODUCT, 
                        product: { 
                            name: res.data.products.name, 
                            link: res.data.products.url, 
                            price: res.data.products.salePrice 
                        }})
                }
              
            })
            
            .catch(err => console.log(err))
    };

    const trackProduct = (event) => {
        event.preventDefault();
        console.log(state.currentProduct.upc)
        const productObj = {
            name: state.currentProduct.name,
            upc: state.currentProduct.upc,
            itemId: state.currentProduct.itemId,
            price: state.currentProduct.price,
            image: state.currentProduct.image,
            amazonPrice: state.amazonProduct.price,
            bestbuyPrice: state.bestbuyProduct.price
        }
        API.trackProduct("5e501cfb343503e52a09651f", productObj)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: TRACK_PRODUCT,
                    product: state.currentProduct
                });
            })
            .catch(err => console.log(err))

    };


    return (
        <div>
            <Navbar />
            <Container>
                <Card className="shadow-sm">
                    <Card.Title>{state.currentProduct.name}</Card.Title>
                    <Card.Img src={state.currentProduct.image} variant="top" style={{ width: "45%" }} className="ml-5 pl-5 pt-5" />
                    <Card.Text>Description: {state.currentProduct.description}</Card.Text>
                    <Button variant="success" onClick={trackProduct}>Track Product</Button>

                </Card> */}
                <Row>
                    <Col>
                        <Image id="main-image" src={state.currentProduct.image} />
                    </Col>
                    <Col className="text-center" id="item-description">
                        <h4 className="font-weight-bold"> {state.currentProduct.name} </h4>
                        <div className="m-4">
                            <p>Description:  {state.currentProduct.description}</p>
                        </div>
                        <Button variant="success" onClick={trackProduct}>Track Product</Button>

                    </Col>
                </Row>

               
                    <Card>
                        <Card.Title>Walmart:</Card.Title>
                        <Card.Text>Price: ${state.currentProduct.price} </Card.Text>
                        <Card.Text><a href={state.currentProduct.link}>Go to site</a></Card.Text>
                    </Card>
              

                {state.amazonProduct.name !== "" ? (<Card>
                        <Card.Title>Amazon:</Card.Title>
                        <Card.Text>Price: {state.amazonProduct.price} </Card.Text>
                        <Card.Text><a href={state.amazonProduct.link}>Go to site</a></Card.Text>
                    </Card>) : ( <div></div>
                    
                )}

                {state.bestbuyProduct.name !== "" ? (<Card>
                    <Card.Title>Best Buy:</Card.Title>
                    <Card.Text>Price: ${state.bestbuyProduct.price} </Card.Text>
                    <Card.Text><a href={state.bestbuyProduct.link}>Go to site</a></Card.Text>
                </Card>) : (
                    <div></div>
                )}
                

            </Container>
        </div>
    );
};

export default Product;