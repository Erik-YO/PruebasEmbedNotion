

const CONSUMER_KEY = "GPzZtrX3nZxq2sn2x6jA8TWgtDsmZ7O7qROPfaG1BxqMFuzjXa"

const URL = `https://api.tumblr.com/v2/blog/compendio-malakia/posts?api_key=${CONSUMER_KEY}`;


function toDOM(str) {
    return new DOMParser().parseFromString(str, "text/html").body.firstChild;
}

function fastHash(str, maxVal) {
    let res = 0;
    for (let i = 0; i < str.length; i++) {
        res += str.charCodeAt(i);
    }
    return res % maxVal;
}

function colorFromTag(tag) {
    const colors = [
        'tagviolet',
        'tagblue',
        'taggreen',
        'tagsalmon',
        'taggray',
        //'tag',
    ]
    return colors[fastHash(tag, colors.length)];
}


function fromPostListToInterface(posts) {
    console.log(posts)

    let lista = document.body.getElementsByClassName('filter-list')[0];
    console.log(lista);

    for (let post of posts) {
        let blogname = post.blog_name;
        let postid = post.id;
        let posturl = post.post_url;

        let tags = post.tags;

        let postObj = toDOM('<div class="filter-block">' +
            post.body/*.replace(/<p><br\/><\/p>/g, '')*/ +
            '</div>');
        let tagObj = toDOM(
            '<div class="tags">' +
            tags.map(t => `<span class="tagspan ${colorFromTag(t)}"><b>${t}</b></span>`)
                .join(' ') +
            '</div>'
        );

        // h
        let titleObj = null;
        let h1 = postObj.getElementsByTagName('h1');
        if (!h1.length){
            let h2 = postObj.getElementsByTagName('h2');
            if (!h2.length){
                let h3 = postObj.getElementsByTagName('h3');
                if (!h3.length){
                    let p = postObj.getElementsByTagName('p');
                    titleObj = p.length ? p[0] : {innerText:''};
                }else{
                    titleObj = h3[0];
                }        
            }else{
                titleObj = h2[0]; 
            }    
        }else{
            titleObj = h1[0]; 
        }
        titleObj.classList.add('filter-title');


        console.log(postObj);
        postObj.appendChild(tagObj);
        lista.appendChild(postObj);
    }

}


async function fetchData() {

    let posts = [];
    let done = false;

    let limit = 2; // [1-20]
    let offset = 0;

    while(!done){
        let peticion = `${URL}&limit=${limit}&offset=${offset}`
        await fetch(peticion, {
            method: 'GET',
            })
            .then(r => r.json())
            .then(r => r.response.posts)
            .then(r => {
                if (r.length < limit) done = true;
                return r;
            })
            .then(d => posts.push(...d));
        offset = posts.length;
    }

    return posts;
}

fetchData().then(pts => fromPostListToInterface(pts));

