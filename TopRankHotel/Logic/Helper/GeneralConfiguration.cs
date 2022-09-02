using Logic.IHelper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Helper
{
    public class GeneralConfiguration: IGeneralConfiguration
    {
        public string CodeUrl { get; set; }

        public string Token { get; set; }

        public string PayStakApiKey { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public decimal DollarRate { get; set; }

        public string AdminEmail { get; set; }

        public string DeveloperEmail { get; set; }

        public string CoinBaseUrl { get; set; }
        public string CoinBaseSecreteKey { get; set; }
        public string CoinBaseApiKey { get; set; }
    }
}
