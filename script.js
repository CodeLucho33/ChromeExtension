let myLeads = []
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById("tab-btn")
let listItems = ""
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
console.log(leadsFromLocalStorage)
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads()
}
deleteBtn.addEventListener("dblclick", function(){
localStorage.clear()
myLeads =[]
renderLeads()
})

// tabBtn.addEventListener("click", function(){
//     // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     //     // since only one tab should be active and in the current window at once
//     //     // the return variable should only have one entry
//     //     let activeTab = tabs[0]
//     //     var activeTabId = activeTab.id // or do whatever you need

//     // })
    
//     myLeads.push(tabs[0].url)
//     localStorage.setItem("myLeads", JSON.stringify(myLeads) )
//     render(myLeads)
    
// })
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})


inputBtn.addEventListener('click', function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads()
})
function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        // Refactor the code below to use a template string
        listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        ` }
    ulEl.innerHTML = listItems  
}
