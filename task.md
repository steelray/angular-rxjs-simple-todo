
Build a simple todo app by this design https://www.figma.com/file/G4hG9TBtJg19FtNiApIkzw/Simple-todo-list?node-id=0%3A1


Newly added items should be saved if the page is reloaded.
When a new item added it should immediately appear in the list.
When we typing something in filter input items should be filtered by matching in title or content
When clicking on the delete icon - a popup window with confirmation is appears where we can cancel or delete an item.
By clicking on the checkbox we mark the item as done

You need to use Angular CLI, rxjs.
Use this JSON as mock to get initial todo list data

{
 list: [
   {
     id: 0,
     title: 'item 1',
     content: 'Some content from list',
     done: true,
   },
   {
     id: 1,
     title: 'item 2',
     content: 'Some content from list 2',
     done: true,
   },
   {
     id: 2,
     title: 'item 3',
     content: 'Some content from list 3',
     done: false,
   }
 ]
}

The result of test task should be stored as GitHub repo
