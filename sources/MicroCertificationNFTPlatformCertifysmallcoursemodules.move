module MyModule::MicroCertification {
    use aptos_framework::signer;
    use std::string::String;
    use std::vector;
    use aptos_framework::timestamp;

    /// Struct representing a certification issued to a student
    struct Certification has store, key, copy {
        course_name: String,        // Name of the course/module
        student_address: address,   // Address of the certified student
        issuer_address: address,    // Address of the certification issuer
        issue_timestamp: u64,       // When the certification was issued
        certification_id: u64,      // Unique ID for the certification
    }

    /// Struct to store certification issuer information
    struct CertificationIssuer has store, key {
        issued_count: u64,          // Total certifications issued by this address
        certifications: vector<Certification>, // List of all certifications issued
    }

    /// Function to initialize an account as a certification issuer
    public fun initialize_issuer(issuer: &signer) {
        let certification_issuer = CertificationIssuer {
            issued_count: 0,
            certifications: vector::empty<Certification>(),
        };
        move_to(issuer, certification_issuer);
    }

    /// Function to issue a new certification to a student
    public fun issue_certification(
        issuer: &signer, 
        student_address: address, 
        course_name: String
    ) acquires CertificationIssuer {
        let issuer_address = signer::address_of(issuer);
        let issuer_data = borrow_global_mut<CertificationIssuer>(issuer_address);
        
        // Create new certification
        let certification = Certification {
            course_name,
            student_address,
            issuer_address,
            issue_timestamp: timestamp::now_seconds(),
            certification_id: issuer_data.issued_count + 1,
        };
        
        // Add certification to issuer's record
        vector::push_back(&mut issuer_data.certifications, certification);
        issuer_data.issued_count = issuer_data.issued_count + 1;
    }
}