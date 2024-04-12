
/*console.log(cartData);
  windowObject = window.open();


  cartData.forEach(
    ({ id, sku, desc, qty, price, amount }) => {
      (cartContainer.outerHTML += `
      <tr>
        <td class="cart_cell">${desc}</td>
        <td class="cart_cell">${qty}</td>
        <td class="cart_cell">$${amount}</td>
        <td class="cart_cell">
            <button onclick="deleteItem(this)" type="button"><i class="fa fa-trash"></i></button>
        </td>
      </tr>
      `)
      window.document.write(cartContainer);
    }
  );

  windowObject.print();
  windowObject.close();*/


//TODO: Add search function
//https://dev.to/am20dipi/how-to-build-a-simple-search-bar-in-javascript-4onf
//https://www.w3schools.com/howto/howto_js_search_menu.asp
/*SEARCH FUNCTION
const searchInventoryInput = document.getElementById("search_inventory_input");

searchInventoryInput.addEventListener("input", (e) => {
  let value = e.target.value;
  if (value && value.trim().length > 0){
    value = value.trim().toLowerCase();
  } else {}
});

function setList(results) {
  for (const item of results) {
    const resultItem = document.createElement('li');
    resultItem.classList.add('results_item');
    const text = document.createTextNode(item.desc);
    resultItem.appendChild(text);
    list.appendChild(resultItem);
  }
};

searchInventoryInput.addEventListener("input", (e) => {
  let value = e.target.value;

  if (value && value.trim().length > 0) {
    value = value.trim().toLowerCase()

    setList(inventoryData.filter(item => {
      return item.desc.includes(value)
    }));
  };
});

function clearList() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  };
};*/

var currentdate = new Date();


//Template credit: https://github.com/edisonneza/jspdf-invoice-template
function confirm() {
  
  var pdfObject = jsPDFInvoiceTemplate.default(props);

  console.log("Object created: ", pdfObject);
  console.log(cartData.length);
};

var props = {
  outputType: jsPDFInvoiceTemplate.OutputType.Save,
  returnJsPDFDocObject: true,
  fileName: "Invoice",
  orientationLandscape: false,
  compress: true,
  logo: {
      src: "images/img_logo.png",
      type: 'PNG', //optional, when src= data:uri (nodejs case)
      width: 53.33, //aspect ratio = width/height
      height: 26.66,
      margin: {
          top: 0, //negative or positive num, from the current position
          left: 0 //negative or positive num, from the current position
      }
  },
  stamp: {
      inAllPages: true, //by default = false, just in the last page
      src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
      type: 'JPG', //optional, when src= data:uri (nodejs case)
      width: 20, //aspect ratio = width/height
      height: 20,
      margin: {
          top: 0, //negative or positive num, from the current position
          left: 0 //negative or positive num, from the current position
      }
  },
  business: {
      name: "Gold and Silver Exchange",
      address: "2000 Washington Lane",
      phone: "(757) 777-777",
      email: "info@GoldAndSilverExchange.com",
  },

  invoice: {
      label: "Invoice #: ",
      num: 1,
      invGenDate: "Date: " + (currentdate.getMonth()+1) + "/"
                    + currentdate.getDate() + "/"
                    + currentdate.getFullYear() + " "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds(),
      headerBorder: false,
      tableBodyBorder: false,
      header: [
        {
          title: "#", 
          style: { 
            width: 10 
          } 
        }, 
        { 
          title: "Title",
          style: {
            width: 30
          } 
        }, 
        { 
          title: "Description",
          style: {
            width: 80
          } 
        }, 
        { title: "Price"},
        { title: "Quantity"},
        { title: "Unit"},
        { title: "Total"}
      ],

      table: Array.from(Array(10), (item, index)=>([
        index + 1,
        "There are many variations ",
        "Description",
        200.5,
        4.5,
        "m2",
        400.5
    ])),
      additionalRows: [{
          col1: 'Total:',
          col2: '145,250.50',
          col3: 'ALL',
          style: {
              fontSize: 14 //optional, default 12
          }
      },
      {
          col1: 'VAT:',
          col2: '20',
          col3: '%',
          style: {
              fontSize: 10 //optional, default 12
          }
      },
      {
          col1: 'SubTotal:',
          col2: '116,199.90',
          col3: 'ALL',
          style: {
              fontSize: 10 //optional, default 12
          }
      }],
      invDescLabel: "Thank you for your business!",
      invDesc: "Description",
  },
  footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
  },
  pageEnable: true,
  pageLabel: "Page ",
};