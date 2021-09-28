let domain_search_btn = document.getElementById("domain_search_btn");
let domain_input_field = document.getElementById("domain_input_field");
let domain_success_message = document.getElementById("domain_success_message");
let domain_error_message = document.getElementById("domain_error_message");
let domain_searching_text = document.getElementById("domain_searching_text");
if (domain_search_btn) {
  let domainsearchProcess = async function (e) {
    e.preventDefault();
    domain_success_message.classList.add("domain-hidden");
    domain_error_message.classList.add("domain-hidden");
    domain_searching_text.innerHTML = ``;
    domain_search_btn.innerHTML = "Processing...";

    //AJAX request

    let domain = domain_input_field.value;
    domain_searching_text.innerHTML = `Searching for ${domain} `;
    if (
      domain.includes(".com") ||
      domain.includes(".co.ke") ||
      domain.includes(".org") ||
      domain.includes(".net")
    ) {
      //do nothing
    } else {
      domain_searching_text.innerHTML = `Invalid name, name requires .co.ke OR .com OR .org Or .net`;
      domain_search_btn.innerHTML = "SEARCH";
      return;
    }

    try {
      let res = await axios({
        method: "post",
        url: `https://techkey-domain.herokuapp.com/verify`,
        data: { domain },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });

      console.log("res.data", res.data);
      //   res.data.message
      if (res.data.data.domainStatus) {
        if (res.data.data.domainStatus != "No Object Found") {
          domain_error_message.classList.remove("domain-hidden");
          domain_searching_text.innerHTML = ``;
          console.log(res.data);
        }
        if (res.data.data.domainStatus == "No Object Found") {
          domain_success_message.classList.remove("domain-hidden");
          domain_searching_text.innerHTML = `${domain} Can be Purchased. `;
          console.log(res.data);
        } else {
          domain_error_message.classList.remove("domain-hidden");
          domain_searching_text.innerHTML = ``;
          console.log(res.data);
        }
      }
      if (res.data.message == "") {
        domain_success_message.classList.remove("domain-hidden");
        domain_searching_text.innerHTML = `${domain} Can be Purchased. `;
        console.log(res.data);
      }
    } catch (err) {
      domain_search_btn.innerHTML = "SEARCH";
      domain_searching_text.innerHTML = "";
      domain_searching_text.innerHTML = `Please try again`;
      console.log("err", err);
    }

    //

    domain_search_btn.innerHTML = "SEARCH";

    setTimeout(function (e) {
      domain_success_message.classList.add("domain-hidden");
      domain_error_message.classList.add("domain-hidden");
    }, 7000);
  };
  domain_search_btn.addEventListener("click", domainsearchProcess);
}
