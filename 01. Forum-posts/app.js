window.addEventListener("load", solve);
function solve(){

    document.getElementById("publish-btn").addEventListener("click", createPost);
    let title = document.getElementById("post-title");
    let category = document.getElementById("post-category");
    let content = document.getElementById("post-content");
    let reviewSection = document.getElementById("review-list")
    let approvedSection = document.getElementById("published-list")
    document.getElementById("clear-btn").addEventListener("click", clearPost);

    function createPost(e){

        titleValue = title.value;
        categoryValue = category.value;
        contentValue = content.value;

        if(!titleValue || !categoryValue || !contentValue){
            return;
        }

        createDOMElement(titleValue,categoryValue,contentValue);
        clear();

    }
    function createDOMElement(titleValue,categoryValue,contentValue){

        let li = document.createElement("li")
        li.classList.add("rpost")
        let article = createArticle(titleValue,categoryValue,contentValue)

        let editButton = document.createElement("button");
        editButton.classList.add("action-btn");
        editButton.classList.add("edit")
        editButton.textContent = "Edit"
        editButton.addEventListener("click", editPost)

        let approveButton = document.createElement("button")
        approveButton.classList.add("action-btn")
        approveButton.classList.add("approve")
        editButton.textContent = "Approve"
        editButton.addEventListener("click", approvePost)

        li.appendChild(article)
        li.appendChild(editButton)
        li.appendChild(approveButton)
        reviewSection.appendChild(li)

    }
    function createArticle(titleValue,categoryValue,contentValue){
        let article = document.createElement("article")
        let h = document.createElement("h4")
        h.textContent = titleValue;
        let categoryP = document.createElement("p")
        categoryP.textContent = `Category: ${categoryValue}`;
        let contentP = document.createElement("p")
        contentP.textContent = `Content: ${contentValue}`;

        article.appendChild(h);
        article.appendChild(categoryP);
        article.appendChild(contentP);

        return article;

    }
    function editPost(e){
        let currentPost = e.target.parentElement;
        let articleContent = currentPost.getElementByTagName("article")[0].children;

        let titleValue = articleContent[0].textContent;
        let categoryValue = articleContent[1].textContent;
        let contentValue = articleContent[2].textContent;

        title.value = titleValue;
        category.value = categoryValue.split(": ")[1];
        content.value = contentValue.split(": ")[1]
        currentPost.remove();


    }
    function approvePost(e){
        let currentPost = e.target.parentElement;
        approvedSection.appendChild(currentPost);
        Array.from(currentPost.querySelectorAll("button").forEach(btn => btn.remove()));

    }
    function clear(){
        title.value = "";
        category.value = "";
        content.value = "";
    }
    function clearPost(e){
        Array.from(approvedSection.children.forEach).forEach(li=>li.remove())

    }
    
    
}
//TODO