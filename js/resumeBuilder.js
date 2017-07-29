var model = {

    bio: {
        "name": "Ollie Graham",
        "role": "Web Developer",
        "contacts": {
            "email": "olliegraham@gmail.com",
            "mobile": "+852 6605 3198",
            "github": "https://github.com/Cozmo25",
            "facebook": "https://facebook.com/ollie.graham.79",
            "location": "Hong Kong"
        },
        "biopic": "/images/My Face May-16.jpeg",
        "welcomeMessage": "Welcome to my resume!",
        "skills": ["CFA Charterholder 2009 - 2012", "CIMA Passed Finalist", "15 years financial services experience", "Coding: Full Stack Web Development, HTML, CSS, JS, C, PHP, Python"],
    },

    work: {
    "job": [{
            "title": "CFO",
            "employer": "Biorna Quantics",
            "location": "Hong Kong, Hong Kong S.A.R",
            "dates": "Jan 2017 - Present",
            "description": "Chief Financial Officer. Responsible for developing & enacting corporate financial strategy and accounting policies."
        },
        {
            "title": "Senior Manager",
            "employer": "HSBC",
            "location": "Hong Kong, Hong Kong S.A.R",
            "dates": "Nov 2015 - Apr 2016",
            "description": "Regional project lead for CVA VaR IMM methodology implementation mandated by the bank's regulators."
        },
        {
            "title": "Vice President",
            "employer": "Morgan Stanley",
            "location": "Hong Kong, Hong Kong S.A.R",
            "dates": "Jun 2007 - Feb 2015",
            "description": "Counterparty Portfolio Risk Manager. Responsible for hedging of counterparty & associated risks in relation to bank's Asia fixed income derivative portfolio."
        },
        {
            "title": "Revenue Accountant",
            "employer": "AXA Investment Managers, UK",
            "location": "London, UK",
            "dates": "Jun 2003 - Jun 2006",
            "description": "Responsible for revenue accounting for several Axa Investment Manager legal entities."
        }
        ]
    },

    education: {
    "schools": [{
        "name": "University of Southampton",
        "degree": "2.1 BSc (Hons)",
        "dates": "September 1998 - July 2001",
        "location": "Southampton, UK",
        "majors": ["Biochemistry with Pharmacology"]
    }],
    "onlineclasses": [{
        "title": "Front End Developer Nano Degree",
        "school": "Udacity",
        "dates": "June 2017",
        "url": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
    }]
    },

    projects: {
    "project": [{
            "title": "My Portfolio",
            "dates": "June 2017",
            "description": "Responsive website showcasing the projects I worked on during the Front End Developer Nanodegree Course.",
            "images": ["/images/portfolio.png"]
        },
        {
            "title": "My Resume -- This very Site!",
            "dates": "June 2017",
            "description": "Responsive website showcasing my resume.",
            "images": ["/images/resume_1.png", "/images/resume_2.png"]
        }
    ]
    }
}

var controller = {

    init: function() {

        bioView.init();
        workView.init();
        projectView.init();
        educationView.init();

        $("#main").append(internationalizeButton);
        $("#mapDiv").append(googleMap);

    },

    getBio: function() {
        return model.bio;
    },

    getWork: function() {
        return model.work;
    },

    getProjects: function() {
        return model.projects;
    },

    getEducation: function() {
        return model.education;
    }
}

var bioView = {

    init: function () {
        this.bio = controller.getBio();
        this.render();
    },

    render: function() {
        var formattedName = HTMLheaderName.replace("%data%", this.bio.name);
        var formattedRole = HTMLheaderRole.replace("%data%", this.bio.role);
        var formattedBiopic = HTMLbioPic.replace("%data%", this.bio.biopic);
        var formattedWelcome = HTMLwelcomeMsg.replace("%data%", this.bio.welcomeMessage);
        var formattedEmail = HTMLemail.replace("%data%", this.bio.contacts.email);
        var formattedMobile = HTMLmobile.replace("%data%", this.bio.contacts.mobile);
        var formattedGithub = HTMLgithub.replace("%data%", "<a class='contact_link white-text' href='" + this.bio.contacts.github + "' target='_blank'>" + this.bio.contacts.github.slice(8) + "</a>");
        var formattedFacebook = HTMLfacebook.replace("%data%", "<a class='contact_link white-text' href='" + this.bio.contacts.facebook + "' target='_blank'>" + this.bio.contacts.facebook.slice(8) + "</a>");
        var formattedLocation = HTMLlocation.replace("%data%", this.bio.contacts.location);

        $("#header").prepend(formattedName + formattedRole);
        $("#header").prepend(formattedBiopic);
        $("#header").append(formattedWelcome);

        $("#topContacts, #footerContacts").append("<a class='contact_link' href=mailto:" + this.bio.contacts.email + "?subject=Contact%20Ollie>" + formattedEmail + "</a>" + formattedMobile + formattedGithub + formattedFacebook + formattedLocation);

        var formattedSkills = [];
        if (this.bio.skills.length > 0) {

            $("#header").append(HTMLskillsStart);

            this.bio.skills.forEach(function(elem) {
                formattedSkills[elem] = HTMLskills.replace("%data%", elem);
                $("#skills").append(formattedSkills[elem]);
            });
        }
    }
}

//bio.display();

var workView = {

    init: function() {
        this.work = controller.getWork();
        this.render();
    },

    render: function() {
        this.work.job.forEach(function(job) {
            var formattedWorkCompany = HTMLworkEmployer.replace("%data%", job.employer);
            var formattedWorkTitle = HTMLworkTitle.replace("%data%", job.title);
            var formattedWorkDates = HTMLworkDates.replace("%data%", job.dates);
            var formattedWorkCity = HTMLworkLocation.replace("%data%", job.location);
            var formattedWorkDesc = HTMLworkDescription.replace("%data%", job.description);
            $("#workExperience").append(HTMLworkStart);
            $(".work-entry:last").append(formattedWorkCompany + formattedWorkTitle + formattedWorkDates + formattedWorkCity + formattedWorkDesc);
        });
    }
}

//work.display();

var projectView = {

    init: function() {

        this.projects = controller.getProjects();
        this.render()
    },

    render: function() {

        this.projects.project.forEach(function(proj) {
            var formattedProjectTitle = HTMLprojectTitle.replace("%data%", proj.title);
            var formattedProjectDescription = HTMLprojectDescription.replace("%data%", proj.description);
            var formattedProjectDates = HTMLprojectDates.replace("%data%", proj.dates);
            $("#projects").append(HTMLprojectStart);
            $(".project-entry:last").append(formattedProjectTitle + formattedProjectDates + formattedProjectDescription);

            proj.images.forEach(function(image) {
                var formattedProjectImage = HTMLprojectImage.replace("%data%", image);
                $(".project-entry:last").append(formattedProjectImage);
            });
        });
    }
}

//projects.display();

var educationView = {

    init: function() {
        this.education = controller.getEducation();
        this.render();
    },

    render: function(){
        this.education.schools.forEach(function(school) {
            var formattedSchoolName = HTMLschoolName.replace("%data%", school.name);
            var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", school.degree);
            var formattedSchoolDates = HTMLschoolDates.replace("%data%", school.dates);
            var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", school.location);
            var formattedSchoolMajor = HTMLschoolMajor.replace("%data%", school.majors);
            $("#education").append(HTMLschoolStart);
            $(".education-entry").append(formattedSchoolName + formattedSchoolDegree + formattedSchoolDates + formattedSchoolLocation + formattedSchoolMajor);
        });

        $(".education-entry").append(HTMLonlineClasses);

        this.education.onlineclasses.forEach(function(onlineclass) {
            var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", onlineclass.title);
            var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", onlineclass.school);
            var formattedOnlineDates = HTMLonlineDates.replace("%data%", onlineclass.dates);
            var formattedOnlineURL = HTMLonlineURL.replace("%data%", onlineclass.url.slice(12));
            $(".education-entry:last").append(formattedOnlineTitle + formattedOnlineSchool + formattedOnlineDates + formattedOnlineURL);
        });
    }
}

//education.display();

//make it go
controller.init();
