import React, { useEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useProductApi } from '../api/product';
import { useRewardApi } from '../api/reward';

export const Product = () => {

    const [products, setProducts] = useState([]);
    const [rewards, setRewards] = useState([]);
    const [startDate, setStartDate] = useState(new Date());

    const ref = useRef([]);
    
    const {getAllProducts, getProductById} = useProductApi();
    const {getAllRewards} = useRewardApi();
    
    useEffect(()=> {
        getAllProducts().then(res => setProducts(res));
        getAllRewards().then(res => setRewards(res))
    }, [])

    let selectedProductPrices = [];

    const Unchecked = () => {
        for (let i = 0; i < ref.current.length; i++) {
            ref.current[i].checked = false;
        }
    }

    const buy = () => {

        /*
        Actual - We make a post Api Call
        then make a get Api for rewards so we can get the updated value

        */

        // calculate month
        const month = startDate.getMonth() + 1;
        
        //calculate points
        const sum = selectedProductPrices.reduce((a, b) => a + b, 0);
        let points = 0;
        if (sum > 100) {
            points += (sum - 100)*2;
            points += 50;
        } else if (sum > 50) {
            points += sum - 50;
        }
        
        //update reward points
        if (points > 0) {

            const nextRewards = rewards.map(r => {
                if(r.id == month){
                    return {
                        ...r,
                        point: r.point + points
                    }
                }
                return r;
              });
              setRewards(nextRewards);
              Unchecked();
        }
    }

    const selectedProduct = (e) => {
        if (e.target.checked) {
            selectedProductPrices.push(parseInt(e.target.value));
        } else {
            selectedProductPrices.splice(selectedProductPrices.indexOf(e.target.value), 1);
        }
    }

    return (
        <div>
            <div>
                Please selelct date and product and click on buy
                <span className='date-span'>
                    <DatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
                </span>
            </div>
            <div className='cards'>
                {products.map((product, index)=>(
                    <div className="card" key={index}>
                        <input ref={(element) => { ref.current[index] = element }} type="checkbox" onClick={selectedProduct} value={product.price}/>
                        {product.name} - ${product.price}
                    </div>
                ))}
            </div>
            <div>
                <button type="button" className="buy-btn btn btn-success btn-lg" onClick={buy}>Buy</button>
            </div>
            <div className='cards'>
                {rewards.map((reward, index)=>(
                    <div className="card">
                        {reward.name} - {reward.point}
                    </div>
                ))}
            </div>
        </div>
    )
}