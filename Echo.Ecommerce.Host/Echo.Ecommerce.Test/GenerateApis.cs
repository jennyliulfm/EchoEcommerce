using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using NSwag;
using NSwag.CodeGeneration.CSharp;
using NUnit.Framework;

namespace Echo.Ecommerce.Test
{
    [TestFixture]
    class GenerateApis
    {
        [Test]
        public async Task Generate()
        {
            var rig = await new SwaggerIntegration().Start();
            try
            {
                //System.Threading.Thread.Sleep(10000);
                var response = await rig.HttpTestClient.GetAsync("/swagger/v1/swagger.json");
                response.EnsureSuccessStatusCode();
                var responseString = await response.Content.ReadAsStringAsync();

                var document = await OpenApiDocument.FromJsonAsync(responseString);

                var settings = new CSharpClientGeneratorSettings
                {
                    ClassName = "{controller}Api",
                    AdditionalContractNamespaceUsages = new string[] { "" },
                    AdditionalNamespaceUsages = new string[] {"Echo.Ecommerce.Host.Controllers", "Echo.Ecommerce.Host.Models","Microsoft.AspNetCore.Mvc.ModelBinding", "Microsoft.AspNetCore.Mvc" },
                    CSharpGeneratorSettings =
                    {
                        Namespace = "Echo.Ecommerce.Host.WebApi"
                    },
                    GenerateClientClasses = true,
                    GenerateResponseClasses = false,
                    GenerateDtoTypes = false
                };

                var generator = new CSharpClientGenerator(document, settings);
                var code = generator.GenerateFile();
                var json = document.ToJson();

                json = json.Replace("localhost", "");
                string path = System.IO.Path.Join(Environment.CurrentDirectory, "..\\..\\..\\RestApi.cs");
                System.IO.File.WriteAllText(path, code);
                System.IO.File.WriteAllText(System.IO.Path.Join(Environment.CurrentDirectory, "..\\..\\..\\..\\Echo.Ecommerce.Web\\swagger.json"), json);
            }
            catch (Exception ex)
            {
                Assert.Fail("Exception:" + ex.Message);
            }
            finally
            {
                rig.Stop();
            }
        }
    }
}
