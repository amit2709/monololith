export async function getList() {
    const data = await fetch('https://fedtest.monolith.co.il/api/catalog/getAll');
    return await data.json();
}

export async function getProduct(id) {
    const data = await fetch(`https://fedtest.monolith.co.il/api/catalog/get?id=${id}`);
    return await data.json();
}

export function getUrl(url){
    return `https://fedtest.monolith.co.il/api/imager.php?url=${url}&type=fit&width=1000&height=1000&quality=70`
}

export function addToCart(quantity, id){
    return `https://fedtest.monolith.co.il/api/cart/add?variant_id=${id}&quantity=${quantity}`
}

