function MenuSelection()
{
    if (document.getElementById("menu").value == "Customer List")
    {
        document.getElementById("cust").style.visibility = "visible";
        document.getElementById("hist").style.visibility = "hidden";
        document.getElementById("orders").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Order History")
    {
        document.getElementById("cust").style.visibility = "hidden";
        document.getElementById("hist").style.visibility = "visible";
        document.getElementById("orders").style.visibility = "hidden";
    }
    else
    {
        document.getElementById("cust").style.visibility = "hidden";
        document.getElementById("hist").style.visibility = "hidden";
        document.getElementById("orders").style.visibility = "visible";       
    }
}

function CustDatabase()
{
    var custRequest = new XMLHttpRequest(); //Create AJAX request object
    
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    
    //Checks that the object has returned data
    custRequest.onreadystatechange = function()
    {
        if (custRequest.readyState == 4 && custRequest.status == 200)
        {
            var output = JSON.parse(custRequest.responseText);
            
            CustOutput(output);
        }
    }
    
    //Initiate the server request
    custRequest.open("GET", url, true);
    custRequest.send();
}

function CustOutput(result)
{
    
    var table = "";
    table += "<table border='1' cellpadding = '5' align = 'center'>";
    
    table += "<tr>";
            table += "<td><u><b>Company Name</u></b></td>";
            table += "<td><u><b>Customer ID</u></b></td>";
            table += "<td><b><u>City</u></b></td>";
    table += "</tr>";

    
    for (count = 0; count < result.GetAllCustomersResult.length; count++)
    {
    
    table += "<tr>";
            table += "<td>" + result.GetAllCustomersResult[count].CompanyName + "</td>";
            table += "<td>" + result.GetAllCustomersResult[count].CustomerID + "</td>";
            table += "<td>" + result.GetAllCustomersResult[count].City + "</td>";
    table += "</tr>";            
                
    }
    
    table += "</table>";
    document.getElementById("table").innerHTML = table;
    
}

function GetHist()
{
    var histRequest = new XMLHttpRequest(); //Create AJAX request object
    
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += document.getElementById("custid").value;
    
    
    //CHecks that the object has returned data
    histRequest.onreadystatechange = function()
    {
        if (histRequest.readyState == 4 && histRequest.status == 200)
        {
            var output = JSON.parse(histRequest.responseText);
            
            HistOutput(output);
        }
    }
    
    //Initiate the server request
    histRequest.open("GET", url, true);
    histRequest.send();
}

function HistOutput(result)
{
    var count = 0;
    var table2 = "";
    table2 += "<table border='1' cellpadding = '5' align = 'center'>";
    
    table2 += "<tr>";
            table2 += "<td><u><b>Product Name</u></b></td>";
            table2 += "<td><u><b>Quantity Ordered</u></b></td>";
    table2 += "</tr>";
    
    
    //Loop to extract data from the response object
    for (count = 0; count < result.length; count++)
    {
        table2 += "<tr>";
            table2 += "<td>" + result[count].ProductName + "</td>";
            table2 += "<td>" + result[count].Total + "</td>";
        table2 += "</tr>"; 
    }
    
    table2 += "</table>";
    document.getElementById("table2").innerHTML = table2;
}

function GetOrders()
{
    var ordersRequest = new XMLHttpRequest(); //Create AJAX request object
    
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += document.getElementById("custid2").value;
    
    
    //CHecks that the object has returned data
    ordersRequest.onreadystatechange = function()
    {
        if (ordersRequest.readyState == 4 && ordersRequest.status == 200)
        {
            var output = JSON.parse(ordersRequest.responseText);
            
            OrdersOutput(output);
        }
    }
    
    //Initiate the server request
    ordersRequest.open("GET", url, true);
    ordersRequest.send();
}

function OrdersOutput(result)
{
    var count = 0;
    var table3 = "";
    table3 += "<table border='1' cellpadding = '5' align = 'center'>";
    
    table3 += "<tr>";
            table3 += "<td><u><b>Order Date</u></b></td>";
            table3 += "<td><u><b>Order ID</u></b></td>";
            table3 += "<td><u><b>Shipping Address</u></b></td>";
            table3 += "<td><u><b>Shipping City</u></b></td>";
            table3 += "<td><u><b>Shipping Name</u></b></td>";
            table3 += "<td><u><b>Shipping Postal Code</u></b></td>";
            table3 += "<td><u><b>Shipping Date</u></b></td>";
    table3 += "</tr>";
    
    
    //Loop to extract data from the response object
    for (count = 0; count < result.GetOrdersForCustomerResult.length; count++)
    {
        table3 += "<tr>";
            table3 += "<td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td>";
            table3 += "<td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td>";
            table3 += "<td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td>";
            table3 += "<td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td>";
            table3 += "<td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td>";
            table3 += "<td>" + result.GetOrdersForCustomerResult[count].ShipPostCode + "</td>";
            table3 += "<td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td>";
        table3 += "</tr>"; 
    }
    
    table3 += "</table>";
    document.getElementById("table3").innerHTML = table3;
}