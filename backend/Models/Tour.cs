namespace bayar_backend.Models
{
    public class Tour
    {
        public long id { get; set; }
        public DateTime date { get; set; }
        public string name { get; set; }
        public decimal price { get; set; }
        public string imageUrl { get; set; }
        public string description { get; set; }
    }
}