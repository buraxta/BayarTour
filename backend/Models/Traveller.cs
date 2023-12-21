using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace bayar_backend.Models
{
    public class Traveller
    {


        public long id { get; set; }

        public string name { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }
}