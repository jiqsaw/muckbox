//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Babylips.DB
{
    using System;
    using System.Collections.Generic;
    
    public partial class Record
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string RecordData { get; set; }
        public System.DateTime CreateDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
