module MyModule::MicroCertification {
    use aptos_framework::signer;
    use std::string::String;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use aptos_framework::account;

    /// Error codes
    const E_NOT_INITIALIZED: u64 = 1;
    const E_ALREADY_INITIALIZED: u64 = 2;
    const E_INVALID_STUDENT: u64 = 3;
    const E_CERTIFICATION_NOT_FOUND: u64 = 4;
    const E_UNAUTHORIZED: u64 = 5;

    /// Struct representing a certification issued to a student
    struct Certification has store, key, copy, drop {
        course_name: String,        // Name of the course/module
        student_address: address,   // Address of the certified student
        issuer_address: address,    // Address of the certification issuer
        issue_timestamp: u64,       // When the certification was issued
        certification_id: u64,      // Unique ID for the certification
        metadata_uri: String,       // URI for additional metadata (IPFS hash)
        skills: vector<String>,     // List of skills acquired
        grade: String,              // Grade or score achieved
    }

    /// Struct to store certification issuer information
    struct CertificationIssuer has store, key {
        name: String,                           // Issuer organization name
        issued_count: u64,                      // Total certifications issued by this address
        certifications: vector<Certification>,  // List of all certifications issued
        authorized: bool,                       // Whether the issuer is authorized
        reputation_score: u64,                  // Reputation score based on feedback
    }

    /// Struct to store student's certification collection
    struct StudentProfile has store, key {
        total_certifications: u64,
        certifications: vector<Certification>,
        skill_points: u64,
        profile_created: u64,
    }

    /// Global platform statistics
    struct PlatformStats has store, key {
        total_certifications_issued: u64,
        total_issuers: u64,
        total_students: u64,
        platform_reputation: u64,
    }

    /// Events
    #[event]
    struct CertificationIssued has store, drop {
        certification_id: u64,
        course_name: String,
        student_address: address,
        issuer_address: address,
        timestamp: u64,
    }

    #[event]
    struct IssuerInitialized has store, drop {
        issuer_address: address,
        name: String,
        timestamp: u64,
    }

    #[event]
    struct StudentProfileCreated has store, drop {
        student_address: address,
        timestamp: u64,
    }

    /// Initialize the platform (should be called once by platform admin)
    public fun initialize_platform(admin: &signer) {
        let admin_addr = signer::address_of(admin);

        // Initialize platform stats
        let stats = PlatformStats {
            total_certifications_issued: 0,
            total_issuers: 0,
            total_students: 0,
            platform_reputation: 100, // Starting reputation
        };

        move_to(admin, stats);
    }

    /// Function to initialize an account as a certification issuer
    public fun initialize_issuer(issuer: &signer, name: String) acquires PlatformStats {
        let issuer_addr = signer::address_of(issuer);

        // Check if already initialized
        assert!(!exists<CertificationIssuer>(issuer_addr), E_ALREADY_INITIALIZED);

        let certification_issuer = CertificationIssuer {
            name,
            issued_count: 0,
            certifications: vector::empty<Certification>(),
            authorized: true, // Auto-authorize for demo purposes
            reputation_score: 100,
        };

        move_to(issuer, certification_issuer);

        // Update platform stats
        let stats = borrow_global_mut<PlatformStats>(@MyModule);
        stats.total_issuers = stats.total_issuers + 1;

        // Emit event
        event::emit(IssuerInitialized {
            issuer_address: issuer_addr,
            name,
            timestamp: timestamp::now_seconds(),
        });
    }

    /// Function to initialize a student profile
    public fun initialize_student_profile(student: &signer) acquires PlatformStats {
        let student_addr = signer::address_of(student);

        // Check if already initialized
        if (!exists<StudentProfile>(student_addr)) {
            let profile = StudentProfile {
                total_certifications: 0,
                certifications: vector::empty<Certification>(),
                skill_points: 0,
                profile_created: timestamp::now_seconds(),
            };

            move_to(student, profile);

            // Update platform stats
            let stats = borrow_global_mut<PlatformStats>(@MyModule);
            stats.total_students = stats.total_students + 1;

            // Emit event
            event::emit(StudentProfileCreated {
                student_address: student_addr,
                timestamp: timestamp::now_seconds(),
            });
        };
    }

    /// Function to issue a new certification to a student
    public fun issue_certification(
        issuer: &signer,
        student_address: address,
        course_name: String,
        metadata_uri: String,
        skills: vector<String>,
        grade: String,
    ) acquires CertificationIssuer, StudentProfile, PlatformStats {
        let issuer_address = signer::address_of(issuer);

        // Check if issuer is initialized
        assert!(exists<CertificationIssuer>(issuer_address), E_NOT_INITIALIZED);

        let issuer_data = borrow_global_mut<CertificationIssuer>(issuer_address);

        // Create new certification
        let certification = Certification {
            course_name,
            student_address,
            issuer_address,
            issue_timestamp: timestamp::now_seconds(),
            certification_id: issuer_data.issued_count + 1,
            metadata_uri,
            skills,
            grade,
        };

        // Add certification to issuer's record
        vector::push_back(&mut issuer_data.certifications, certification);
        issuer_data.issued_count = issuer_data.issued_count + 1;

        // Add certification to student's profile if it exists
        if (exists<StudentProfile>(student_address)) {
            let student_profile = borrow_global_mut<StudentProfile>(student_address);
            vector::push_back(&mut student_profile.certifications, certification);
            student_profile.total_certifications = student_profile.total_certifications + 1;
            student_profile.skill_points = student_profile.skill_points + vector::length(&skills);
        };

        // Update platform stats
        let stats = borrow_global_mut<PlatformStats>(@MyModule);
        stats.total_certifications_issued = stats.total_certifications_issued + 1;

        // Emit event
        event::emit(CertificationIssued {
            certification_id: issuer_data.issued_count,
            course_name,
            student_address,
            issuer_address,
            timestamp: timestamp::now_seconds(),
        });
    }

    /// View function to get issuer information
    #[view]
    public fun get_issuer_info(issuer_address: address): (String, u64, bool, u64) acquires CertificationIssuer {
        assert!(exists<CertificationIssuer>(issuer_address), E_NOT_INITIALIZED);
        let issuer_data = borrow_global<CertificationIssuer>(issuer_address);
        (issuer_data.name, issuer_data.issued_count, issuer_data.authorized, issuer_data.reputation_score)
    }

    /// View function to get student profile
    #[view]
    public fun get_student_profile(student_address: address): (u64, u64, u64) acquires StudentProfile {
        if (exists<StudentProfile>(student_address)) {
            let profile = borrow_global<StudentProfile>(student_address);
            (profile.total_certifications, profile.skill_points, profile.profile_created)
        } else {
            (0, 0, 0)
        }
    }

    /// View function to get platform statistics
    #[view]
    public fun get_platform_stats(): (u64, u64, u64, u64) acquires PlatformStats {
        let stats = borrow_global<PlatformStats>(@MyModule);
        (stats.total_certifications_issued, stats.total_issuers, stats.total_students, stats.platform_reputation)
    }

    /// View function to get certification by ID from issuer
    #[view]
    public fun get_certification(issuer_address: address, certification_id: u64): Certification acquires CertificationIssuer {
        assert!(exists<CertificationIssuer>(issuer_address), E_NOT_INITIALIZED);
        let issuer_data = borrow_global<CertificationIssuer>(issuer_address);

        let certifications = &issuer_data.certifications;
        let length = vector::length(certifications);
        let i = 0;

        while (i < length) {
            let cert = vector::borrow(certifications, i);
            if (cert.certification_id == certification_id) {
                return *cert
            };
            i = i + 1;
        };

        abort E_CERTIFICATION_NOT_FOUND
    }

    /// View function to verify if a certification exists
    #[view]
    public fun verify_certification(
        issuer_address: address,
        student_address: address,
        certification_id: u64
    ): bool acquires CertificationIssuer {
        if (!exists<CertificationIssuer>(issuer_address)) {
            return false
        };

        let issuer_data = borrow_global<CertificationIssuer>(issuer_address);
        let certifications = &issuer_data.certifications;
        let length = vector::length(certifications);
        let i = 0;

        while (i < length) {
            let cert = vector::borrow(certifications, i);
            if (cert.certification_id == certification_id && cert.student_address == student_address) {
                return true
            };
            i = i + 1;
        };

        false
    }

    /// Function to update issuer reputation (could be called by governance/feedback system)
    public fun update_issuer_reputation(
        admin: &signer,
        issuer_address: address,
        new_reputation: u64
    ) acquires CertificationIssuer {
        // In a real implementation, you'd check admin permissions here
        let issuer_data = borrow_global_mut<CertificationIssuer>(issuer_address);
        issuer_data.reputation_score = new_reputation;
    }
}
