using Microsoft.AspNetCore.Mvc;
using OptimaJet.Workflow;
using System.Collections.Specialized;
using System.Text;
using WorkflowLib;

namespace DesignerApp.Controllers
{
    public class DesignerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Api()
        {
            Stream? filestream = null;
            var parameters = new NameValueCollection();

            var isPost = Request.Method.Equals("POST", StringComparison.OrdinalIgnoreCase);

            foreach (var q in Request.Query)
            {
                parameters.Add(q.Key, q.Value.First());
            }

            if (isPost)
            {
                var keys = parameters.AllKeys;
                foreach (var key in Request.Form.Keys)
                {
                    if (!keys.Contains(key))
                    {
                        parameters.Add(key, Request.Form[key]);
                    }
                }

                if (Request.Form.Files.Count > 0)
                {
                    filestream = Request.Form.Files[0].OpenReadStream();
                }
            }

            var (result, hasError) = await WorkflowInit.Runtime.DesignerAPIAsync(parameters, filestream);
            if (parameters["operation"]?.ToLower() == "downloadscheme" && !hasError)
            {
                return File(Encoding.UTF8.GetBytes(result), "text/xml");
            }

            if (parameters["operation"]?.ToLower() == "downloadschemebpmn" && !hasError)
            {
                return File(Encoding.UTF8.GetBytes(result), "text/xml");
            }

            return Content(result);
        }
    }
}
