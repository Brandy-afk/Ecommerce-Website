namespace ZdyesAPI.Models.Domain.Products
{
    public class Disc
    {
        public Guid ProductId { get; set; }
        public DiscTypeEnum DiscType { get; set; }
        public bool Custom { get; set; }
        public float Diameter { get; set; }
        public float Thickness { get; set; }
        public float Weight { get; set; }
        public Product? Product { get; set; }
        public Inventory? Inventory { get; set; }

    }

    public enum DiscTypeEnum
    {
        Any = 0,
        DistanceDriver=1,
        FairwayDriver=2,
        MidRange=3,
        PuttAndApproach=4,
        Touch=5
    }
}
