const container=document.getElementById('music')
const container1=document.querySelector(".music123")
const pagenation=document.querySelector(".pagenation")
var total_cart_price = document.querySelector('#total-value').innerText;


const cart_items = document.querySelector('#cart .cart-items');
container.addEventListener('click',(e)=>{
    if(e.target.className=="shopaddingbutton"){
        const id1=e.target.parentNode.previousSibling.id
        const id = e.target.parentNode.parentNode.id;
        const name = e.target.parentNode.parentNode.id;

        
        if (document.querySelector(`#in-cart-${id}`)){
            alert('This item is already added to the cart');
            return
        }
      
       let obj={
           productID:id1
       }
        axios
        .post('http://localhost:3000/cart',obj)
        
        axios
        .get("http://localhost:3000/cart").then((products)=>{
            console.log(products.data.products)
            let cartproducts=products.data.products
           
            let cartproductslength=products.data.products.length
            cart_items.innerHTML=""
            for(let i=0;i<cartproductslength;i++){
                
                document.querySelector('.cart-count').innerText = parseInt(document.querySelector('.cart-count').innerText)+1
                
                const cart_item = document.createElement('div');
                cart_item.classList.add('cart-row');
                cart_item.setAttribute('id',`in-cart-${cartproducts[i].id}`);
               
                total_cart_price = parseFloat(total_cart_price) + parseFloat(cartproducts[i].price)
                total_cart_price = total_cart_price.toFixed(2)
                document.querySelector('#total-value').innerText = `${total_cart_price}`;
                cart_item.innerHTML = `
                <span class='cart-item cart-column'>
                <img class='cart-img' src="${cartproducts[i].imageUrl}" alt="">
                    <span>${cartproducts[i].title}</span>
            </span>
            <span class='cart-price cart-column'>${cartproducts[i].price}</span>
            <span class='cart-quantity cart-column'>
                <input type="text" value="1">
                <button class="remove" type="button">REMOVE</button>
            </span>`
                cart_items.appendChild(cart_item)
        }
        }).catch(err=>console.log(err))
 






         const container = document.getElementById('container');
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `<h4>Your Product : <span>${name}</span> is added to the cart<h4>`;
        container.appendChild(notification);
        setTimeout(()=>{
            notification.remove();
        },2500)

    }
    if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-holder'){
        document.querySelector('#cart').style = "display:block;"
    }
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }
    if (e.target.className=='purchase-btn'){
        if (parseInt(document.querySelector('.cart-count').innerText) === 0){
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
        alert('Thanks for the purchase')
        cart_items.innerHTML = ""
        document.querySelector('.cart-count').innerText = 0
        document.querySelector('#total-value').innerText = `0`;
    }
   
    if (e.target.className=="remove"){
        let total_cart_price = document.querySelector('#total-value').innerText;
        total_cart_price = parseFloat(total_cart_price).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2) ;
        document.querySelector('.cart-count').innerText = parseInt(document.querySelector('.cart-count').innerText)-1
        document.querySelector('#total-value').innerText = `${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }
    if(e.target.className=="page"){
        const reqpage=e.target.id;
        axios
        .get(`http://localhost:3000/products/?page=${reqpage}`).then((data)=>{
            const products=data.data.products;
            const pages=data.data.obj;
            // console.log(products)
            const container1=document.querySelector(".music123")
            const pagenation=document.querySelector(".pagenation")
            container1.innerHTML="";
           
            for(let i=0;i<products.length;i++){
                console.log(products[i].id);
                const id=products[i].id;
                const product = document.createElement('div');
                 product.classList.add('product');
                 product.setAttribute('id',products[i].title)
                 const head=document.createElement('h3')
                 head.innerText=`${products[i].title}`;
                 product.appendChild(head)
                 const imgdiv=document.createElement('div')
                 imgdiv.classList.add('imagediv')
                 imgdiv.setAttribute('id',id);
                 const img=document.createElement('img')
                 img.classList.add('prodimg');
                 img.setAttribute('src',`${products[i].imageUrl}`)
                 img.setAttribute('alt',`${products[i].title}`)
                 imgdiv.appendChild(img)
                 product.appendChild(imgdiv)
                 const prodde=document.createElement('div')
                 prodde.classList.add("productdetails")
                 const pspa=document.createElement("span")
                 pspa.innerText=products[i].price;
                 prodde.appendChild(pspa)
                 const btn=document.createElement("button")
                 btn.classList.add("shopaddingbutton")
                 btn.setAttribute('type',"button")
                 btn.innerText="Add to cart"
                 prodde.appendChild(btn)
                 product.appendChild(prodde)
                 container1.appendChild(product)
             
    
            }
            pagenation.innerHTML="";
            if(pages.currentpage !=1 && pages.previouspage!=1){
                const newpg=document.createElement("a")
                newpg.setAttribute('id',`1`)
                newpg.setAttribute("class","page")
                newpg.innerText=`1`
                
                pagenation.appendChild(newpg);
            }
            if(pages.haspreviouspage ){
                const newpg2=document.createElement("a")
                newpg2.setAttribute("class","page")
                newpg2.setAttribute("id",`${pages.previouspage}`)
                newpg2.innerText=`${pages.previouspage}`
                pagenation.appendChild(newpg2);  }
           
            const newpg1=document.createElement("a")
            newpg1.setAttribute("id",`${pages.currentpage}`)
            console.log("rendering current page")
            newpg1.setAttribute("class","page")
            newpg1.innerText=`${pages.currentpage}`
            pagenation.appendChild(newpg1);
            
          
            if(pages.hasnextpage){
                const newpg3=document.createElement("a")
                newpg3.setAttribute("class","page")
                newpg3.setAttribute("id",`${pages.nextpage}`)
                newpg3.innerText=`${pages.nextpage}`
                pagenation.appendChild(newpg3);
            }
            if(pages.lastpage !== pages.currentpage && pages.nextpage!==pages.lastpage){
                const newpg4=document.createElement("a")
                newpg4.setAttribute("class","page")
                newpg4.setAttribute("id",`${pages.lastpage}`)
                newpg4.innerText=`${pages.lastpage}`
                pagenation.appendChild(newpg4);
            }
    
    
    
        }).catch(err=>console.log(err))
 
    }
    
})
window.addEventListener('DOMContentLoaded', (event) => {
    axios
    .get("http://localhost:3000/products/?page=1").then((data)=>{
        const products=data.data.products;
        const pages=data.data.obj;
        console.log(pages.currentpage)
        
       
        for(let i=0;i<products.length;i++){
            console.log(products[i].id);
            const id=products[i].id;
            const product = document.createElement('div');
             product.classList.add('product');
             product.setAttribute('id',products[i].title)
             const head=document.createElement('h3')
             head.innerText=`${products[i].title}`;
             product.appendChild(head)
             const imgdiv=document.createElement('div')
             imgdiv.classList.add('imagediv')
             imgdiv.setAttribute('id',id);
             const img=document.createElement('img')
             img.classList.add('prodimg');
             img.setAttribute('src',`${products[i].imageUrl}`)
             img.setAttribute('alt',`${products[i].title}`)
             imgdiv.appendChild(img)
             product.appendChild(imgdiv)
             const prodde=document.createElement('div')
             prodde.classList.add("productdetails")
             const dollar=document.createElement("span")
             dollar.innerText="$"
             prodde.appendChild(dollar)
             const pspa=document.createElement("span")
             pspa.innerText=products[i].price;
             prodde.appendChild(pspa)
             const btn=document.createElement("button")
             btn.classList.add("shopaddingbutton")
             btn.setAttribute('type',"button")
             btn.innerText="Add to cart"
             prodde.appendChild(btn)
             product.appendChild(prodde)
             container1.appendChild(product)

        }
        pagenation.innerHTML="";
        if(pages.currentpage !=1 && previouspage!=1){
            const newpg=document.createElement("a")
            newpg.setAttribute('id',`1`)
            newpg.setAttribute("class","page")
            newpg.innerText=`1`
            
            pagenation.appendChild(newpg);
        }
        if(pages.haspreviouspage){
            const newpg2=document.createElement("a")
            newpg2.setAttribute("class","page")
            newpg2.setAttribute("id",`${pages.previouspage}`)
            newpg2.innerText=`${pages.previouspage}`
            pagenation.appendChild(newpg2);
        }
       
        const newpg1=document.createElement("a")
        newpg1.setAttribute("id",`${pages.currentpage}`)
        newpg1.setAttribute("class","page")
        newpg1.innerText=`${pages.currentpage}`
        pagenation.appendChild(newpg1)
        
        if(pages.hasnextpage){
            const newpg3=document.createElement("a")
            newpg3.setAttribute("class","page")
            newpg3.setAttribute("id",`${pages.nextpage}`)
            newpg3.innerText=`${pages.nextpage}`
            pagenation.appendChild(newpg3);
        }
        if(pages.lastpage !== pages.currentpage && pages.nextpage!==pages.lastpage){
            const newpg4=document.createElement("a")
            newpg4.setAttribute("class","page")
            newpg4.setAttribute("id",`${pages.lastpage}`)
            newpg4.innerText=`${pages.lastpage}`
            pagenation.appendChild(newpg4);
        }



    }).catch(err=>console.log(err))
    axios
        .get("http://localhost:3000/cart").then((products)=>{
            console.log(products.data.products)
            let cartproducts=products.data.products
           
            let cartproductslength=products.data.products.length
            cart_items.innerHTML=""
            for(let i=0;i<cartproductslength;i++){
                
                document.querySelector('.cart-count').innerText = parseInt(document.querySelector('.cart-count').innerText)+1
                
                const cart_item = document.createElement('div');
                cart_item.classList.add('cart-row');
                cart_item.setAttribute('id',`in-cart-${cartproducts[i].id}`);
               
                total_cart_price = parseFloat(total_cart_price) + parseFloat(cartproducts[i].price)
                total_cart_price = total_cart_price.toFixed(2)
                document.querySelector('#total-value').innerText = `${total_cart_price}`;
                cart_item.innerHTML = `
                <span class='cart-item cart-column'>
                <img class='cart-img' src="${cartproducts[i].imageUrl}" alt="">
                    <span>${cartproducts[i].title}</span>
            </span>
            <span class='cart-price cart-column'>${cartproducts[i].price}</span>
            <span class='cart-quantity cart-column'>
                <input type="text" value="1">
                <button class="remove" type="button">REMOVE</button>
            </span>`
                cart_items.appendChild(cart_item)
        }
        }).catch(err=>console.log(err))
 

});
