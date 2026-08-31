# -*- coding: utf-8 -*-
"""
Full Authentic Curriculum for Levels 5 & 6 (Lessons 141 to 160)
20 lessons = 230 unique questions (10*12 + 10*11), 80 quizzes, 80 practice exercises.
"""

CURRICULUM_L5_L6 = {}

from curriculum_levels5_6_full import CURRICULUM_L5_L6 as L56_A
CURRICULUM_L5_L6.update(L56_A) # 141 to 145

from curriculum_149_to_160 import CURRICULUM_149_160 as L56_B
CURRICULUM_L5_L6.update(L56_B) # 149 to 160

# Add 146, 147, 148
CURRICULUM_L5_L6.update({
    146: {
        "title": "Expressing Cause, Effect, and Dependencies",
        "questions": [
            ("Choose the verb phrase expressing primary causation in a technical post-mortem: 'The service degradation ___ a memory leak in the connection pool.'", ["stemmed from", "resulted to", "led in", "caused by to"], "stemmed from", "'stemmed from' (découlait de / avait pour origine)."),
            ("Select the verb phrase indicating consequence: 'The database index corruption ___ elevated disk I/O and query timeouts.'", ["resulted in", "resulted from", "stemmed to", "caused of"], "resulted in", "'resulted in' (a abouti à / a entraîné)."),
            ("Complete the technical dependency statement: 'The payment service is strictly ___ upon the token validation service.'", ["contingent / dependent", "resulted", "stemmed", "leading"], "contingent / dependent", "'contingent upon' (tributaire de / subordonné à)."),
            ("Choose the phrase expressing catalyst action: 'The sudden surge in unindexed queries ___ a cascading cluster failure.'", ["precipitated / triggered", "stemmed from", "depended of", "resulted from"], "precipitated / triggered", "'precipitated' (a précipité / a déclenché)."),
            ("Select the connector indicating cause with a noun phrase: 'Deployment was aborted ___ an incompatible schema migration.'", ["owing to / due to", "because", "since", "consequently"], "owing to / due to", "'owing to / due to' + groupe nominal."),
            ("Complete: 'Failure in the primary cache ___ the backend to query the database directly.'", ["forced / caused", "resulted", "stemmed", "led"], "forced / caused", "forced the backend to..."),
            ("Choose the phrase expressing logical consequence: 'The pod ran out of memory; ___, Kubernetes terminated the container.'", ["hence / consequently", "due to", "owing to", "because of"], "hence / consequently", "'hence' ou 'consequently' exprime la conséquence logique."),
            ("Complete: 'The latency reduction is directly ___ to our Redis caching layer.'", ["attributable", "attributed of", "attributing", "attribute"], "attributable", "'attributable to' (imputable à)."),
            ("Select the phrase expressing reciprocal dependency: 'The two microservices are mutually ___ upon shared Redis state.'", ["dependent", "depending", "depend", "depended"], "dependent", "mutually dependent upon..."),
            ("Complete: 'High network contention ___ in packet drops at the top-of-rack switch.'", ["culminated / resulted", "stemmed", "originated", "caused"], "culminated / resulted", "'culminated in' (a abouti à / a culminé en)."),
            ("Choose the cause-and-effect verb: 'Misconfigured IAM policies ___ unauthorized read access to the S3 bucket.'", ["enabled / permitted", "stemmed", "resulted from", "prevented from"], "enabled / permitted", "enabled / permitted.")
        ],
        "quiz": [
            ("What is the difference between 'resulted from' and 'resulted in'?", ["'resulted from' introduces the cause; 'resulted in' introduces the effect", "'resulted from' introduces the effect; 'resulted in' introduces the cause", "They are identical in meaning", "Neither is used in technical English"], "'resulted from' introduces the cause; 'resulted in' introduces the effect", "resulted from = provient de ; resulted in = a entraîné."),
            ("What preposition follows 'contingent' in technical architecture dependency descriptions?", ["upon / on", "with", "to", "for"], "upon / on", "contingent upon / on."),
            ("Complete: 'The outage was ___ to a misconfigured BGP route.'", ["attributable", "attributing", "attributed from", "attribute"], "attributable", "attributable to."),
            ("Which phrase means 'has its origin in'?", ["stems from / originates from", "leads to", "results in", "brings about"], "stems from / originates from", "stems from = tire son origine de.")
        ],
        "practice": [
            ("State the origin of an incident in an RCA summary:", ["The API gateway outage stemmed from an unhandled null pointer exception in the routing middleware.", "The API gateway outage resulted to an unhandled null pointer exception in the routing middleware.", "The API gateway outage caused from an unhandled null pointer exception in the routing middleware.", "The API gateway outage led in an unhandled null pointer exception in the routing middleware."], "The API gateway outage stemmed from an unhandled null pointer exception in the routing middleware.", "stemmed from."),
            ("Describe a technical consequence in a performance report:", ["The missing database index resulted in a 400% increase in CPU consumption.", "The missing database index resulted from a 400% increase in CPU consumption.", "The missing database index stemmed to a 400% increase in CPU consumption.", "The missing database index caused of a 400% increase in CPU consumption."], "The missing database index resulted in a 400% increase in CPU consumption.", "resulted in."),
            ("Document a strict service dependency in an architecture specification:", ["The search microservice is contingent upon the Elasticsearch cluster being fully synchronized.", "The search microservice is contingent with the Elasticsearch cluster being fully synchronized.", "The search microservice is contingent for the Elasticsearch cluster being fully synchronized.", "The search microservice is contingent to the Elasticsearch cluster being fully synchronized."], "The search microservice is contingent upon the Elasticsearch cluster being fully synchronized.", "contingent upon."),
            ("Explain the consequence of a memory leak:", ["Excessive object allocations culminated in an out-of-memory kernel panic.", "Excessive object allocations stemmed in an out-of-memory kernel panic.", "Excessive object allocations originated in an out-of-memory kernel panic.", "Excessive object allocations caused from an out-of-memory kernel panic."], "Excessive object allocations culminated in an out-of-memory kernel panic.", "culminated in.")
        ]
    },

    147: {
        "title": "Adverbs of Degree in Performance Reviews",
        "questions": [
            ("Choose the adverb indicating a massive, measurable performance gain: 'After enabling Redis caching, response latency was ___ reduced.'", ["drastically / substantially", "marginally", "slightly", "barely"], "drastically / substantially", "'drastically / substantially' exprime une réduction massive et spectaculaire."),
            ("Select the adverb indicating a negligible or minimal change: 'The memory consumption increased only ___ after adding the new logging handler.'", ["marginally / negligibly", "substantially", "drastically", "enormously"], "marginally / negligibly", "'marginally' indique une variation minime ou à la marge."),
            ("Complete the benchmark statement: 'The compiled Rust binary is ___ faster than the legacy Python script.'", ["considerably / significantly", "marginally not", "slight", "almost"], "considerably / significantly", "'considerably faster' renforce la comparaison de performance."),
            ("Choose the adverb expressing moderate degree: 'The database optimization improved query throughput ___.'", ["moderately / reasonably", "drastically not", "barely", "infinitely"], "moderately / reasonably", "'moderately' indique un gain modéré."),
            ("Select the adverb expressing near total completion: 'The data migration is ___ complete across all geographic shards.'", ["virtually / practically", "marginally", "scarcely", "slightly"], "virtually / practically", "'virtually / practically complete' (pratiquement / quasi achevé)."),
            ("Complete: 'The server was ___ overloaded during the DDoS attack.'", ["severely / heavily", "slightly", "marginally", "barely"], "severely / heavily", "'severely overloaded' (sévèrement surchargé)."),
            ("Choose the adverb indicating absolute degree: 'The new encryption key rotation protocol is ___ automated.'", ["fully / entirely", "marginally", "partially not", "slightly"], "fully / entirely", "'fully / entirely automated' (entièrement automatisé)."),
            ("Complete: 'Response times degraded ___ as concurrent active users approached one hundred thousand.'", ["exponentially / sharply", "marginally", "flatly", "scarcely"], "exponentially / sharply", "'exponentially / sharply' (de façon exponentielle / brutale)."),
            ("Select the sentence with accurate adverb placement in a technical review:", ["The throughput improved substantially after we tuned the kernel TCP buffer parameters.", "The throughput substantially improved after we tuned the kernel TCP buffer parameters did.", "The throughput improved substantial after we tuned the kernel TCP buffer parameters.", "The throughput improved substantively not after we tuned the kernel TCP buffer parameters."], "The throughput improved substantially after we tuned the kernel TCP buffer parameters.", "improved substantially."),
            ("Complete: 'The CPU utilization remained ___ stable throughout the 24-hour soak test.'", ["remarkably / exceptionally", "marginally", "scarcely", "barely"], "remarkably / exceptionally", "'remarkably stable' (remarquablement stable)."),
            ("Choose the adverb expressing insufficiency: 'The single worker node was ___ equipped to process the million-record batch.'", ["scarcely / ill", "substantially", "fully", "drastically"], "scarcely / ill", "'ill-equipped / scarcely equipped' (mal équipé / à peine suffisant)."),
            ("Complete: 'Disk I/O latency was ___ unaffected by the background snapshot process.'", ["largely / predominantly", "scarcely", "barely", "drastically"], "largely / predominantly", "'largely unaffected' (très largement préservé / non affecté).")
        ],
        "quiz": [
            ("Which adverb of degree indicates a very large positive improvement?", ["substantially / significantly / drastically / considerably", "marginally / slightly / barely", "scarcely", "hardly"], "substantially / significantly / drastically / considerably", "Ces adverbes expriment un gain majeur."),
            ("Which adverb of degree indicates that a change was extremely small?", ["marginally / negligibly / slightly", "drastically", "exponentially", "substantially"], "marginally / negligibly / slightly", "Ces adverbes expriment un impact négligeable."),
            ("Complete: 'The cluster is ___ operational after the failover.'", ["fully / completely", "marginally", "scarcely", "slight"], "fully / completely", "fully operational."),
            ("What does 'virtually zero downtime' mean in an engineering SLA report?", ["Almost zero downtime (e.g. 99.999% uptime)", "100 hours of downtime", "Downtime that only exists in virtual reality", "Infinite downtime"], "Almost zero downtime (e.g. 99.999% uptime)", "Pratiquement aucun temps d'arrêt.")
        ],
        "practice": [
            ("Highlight an impressive latency reduction in a sprint benchmark review:", ["Refactoring the SQL query reduced p99 execution latency substantially from 450ms to 18ms.", "Refactoring the SQL query reduced p99 execution latency marginally from 450ms to 18ms.", "Refactoring the SQL query reduced p99 execution latency barely from 450ms to 18ms.", "Refactoring the SQL query reduced p99 execution latency slightly from 450ms to 18ms."], "Refactoring the SQL query reduced p99 execution latency substantially from 450ms to 18ms.", "substantially (baisse majeure)."),
            ("Report that memory footprint was barely altered by a new feature:", ["The addition of the telemetry agent increased memory usage only marginally by 0.2%.", "The addition of the telemetry agent increased memory usage drastically by 0.2%.", "The addition of the telemetry agent increased memory usage exponentially by 0.2%.", "The addition of the telemetry agent increased memory usage substantially by 0.2%."], "The addition of the telemetry agent increased memory usage only marginally by 0.2%.", "only marginally (hausse minime)."),
            ("Describe the stability of a server cluster under extreme benchmark load:", ["The Kubernetes cluster remained remarkably stable throughout the 48-hour continuous stress test.", "The Kubernetes cluster remained marginally stable throughout the 48-hour continuous stress test.", "The Kubernetes cluster remained scarcely stable throughout the 48-hour continuous stress test.", "The Kubernetes cluster remained barely stable throughout the 48-hour continuous stress test."], "The Kubernetes cluster remained remarkably stable throughout the 48-hour continuous stress test.", "remarkably stable."),
            ("Confirm that a deployment pipeline is fully automated:", ["Our release workflow is now entirely automated from git push to production canary rollout.", "Our release workflow is now marginally automated from git push to production canary rollout.", "Our release workflow is now scarcely automated from git push to production canary rollout.", "Our release workflow is now slightly automated from git push to production canary rollout."], "Our release workflow is now entirely automated from git push to production canary rollout.", "entirely automated.")
        ]
    },

    148: {
        "title": "Formulating Hypotheses and Risk Mitigation",
        "questions": [
            ("Choose the formula for expressing a technical hypothesis: '___ that the database connection pool is saturated, increasing max_connections should alleviate timeouts.'", ["Assuming / Hypothesizing", "Because", "Although", "Despite"], "Assuming / Hypothesizing", "'Assuming that...' (En supposant que...)."),
            ("Select the phrase introducing a contingency plan: '___ a regional cloud outage, our multi-region failover will automatically route traffic to us-west-2.'", ["In the event of", "Due to", "Because of", "Although of"], "In the event of", "'In the event of' (En cas de / Dans l'éventualité de)."),
            ("Complete the risk assessment statement: 'There is a high ___ that concurrent writes without locking will trigger race conditions.'", ["probability / likelihood", "hoping", "desire", "contingency"], "probability / likelihood", "'high probability / likelihood' (forte probabilité)."),
            ("Choose the phrase expressing mitigated risk: 'We have implemented circuit breakers to ___ the risk of cascading microservice failures.'", ["mitigate / minimize", "maximize", "escalate", "precipitate"], "mitigate / minimize", "'mitigate the risk' (atténuer le risque)."),
            ("Complete: '___ that the network bandwidth remains stable, data synchronization will complete within two hours.'", ["Provided / Providing", "Unless", "Although", "Despite"], "Provided / Providing", "'Provided that' (Pourvu que / À condition que)."),
            ("Select the negative condition connector: 'The backup will fail ___ the destination S3 bucket has sufficient write permissions.'", ["unless", "if", "provided", "assuming"], "unless", "'unless' (à moins que / sauf si)."),
            ("Complete: 'As a precautionary ___, we will snapshot all EBS volumes prior to the schema alter.'", ["measure / step", "risk", "hazard", "threat"], "measure / step", "precautionary measure (mesure de précaution)."),
            ("Choose the sentence formulating a data-backed hypothesis in an RCA:", ["We hypothesize that the latency spike was precipitated by garbage collection pauses in the JVM.", "We guess that JVM did something bad maybe.", "We think JVM is broken because we don't know.", "JVM died randomly."], "We hypothesize that the latency spike was precipitated by garbage collection pauses in the JVM.", "Hypothèse formulée avec rigueur."),
            ("Complete: 'To guard ___ data loss, all transactions are written to a write-ahead log (WAL).'", ["against", "for", "to", "with"], "against", "'guard against' (se prémunir contre)."),
            ("Select the risk mitigation strategy: 'We established a fallback mechanism to ensure graceful ___ during upstream outages.'", ["degradation", "destruction", "failure", "halt"], "degradation", "graceful degradation (dégradation élégante)."),
            ("Complete: '___ the primary DNS resolver fail, traffic will immediately switch to secondary nameservers.'", ["Should", "Were", "Did", "Had"], "Should", "'Should the resolver fail' (inversion conditionnelle du 1er type).")
        ],
        "quiz": [
            ("What does 'In the event of X' mean in disaster recovery documentation?", ["If X happens (introducing a contingency protocol)", "Because X already happened", "Although X is impossible", "After X is completed"], "If X happens (introducing a contingency protocol)", "En cas de X / Dans l'éventualité de X."),
            ("What is the meaning of 'unless' in technical conditions?", ["if not / except if", "if and only if", "because", "although"], "if not / except if", "unless = à moins que / sauf si."),
            ("Complete: 'As a ___ measure, we will run the migration in dry-run mode first.'", ["precautionary / preventive", "dangerous", "careless", "hazardous"], "precautionary / preventive", "precautionary measure."),
            ("How do you form formal condition inversion for future possibilities ('If the server fails...')?", ["Should the server fail...", "Had the server fail...", "Did the server fail...", "Were the server fail..."], "Should the server fail...", "Should + sujet + base verbale.")
        ],
        "practice": [
            ("Formulate an engineering hypothesis regarding an ongoing performance issue:", ["We hypothesize that the elevated query latency is caused by lock contention on the accounts table.", "We guess the table is locked maybe.", "Table has problems we think.", "Probably lock contention happens."], "We hypothesize that the elevated query latency is caused by lock contention on the accounts table.", "Formulation d'hypothèse technique rigoureuse."),
            ("Document a disaster recovery contingency plan in a runbook:", ["In the event of a total datacenter outage, our GeoDNS configuration will redirect traffic to the disaster recovery site within 60 seconds.", "If datacenter dies, we will try to fix it.", "When datacenter is down, people will wait.", "Datacenter failure means we do failover."], "In the event of a total datacenter outage, our GeoDNS configuration will redirect traffic to the disaster recovery site within 60 seconds.", "Plan de secours opérationnel et chiffré."),
            ("Express a condition using formal inversion (Should...):", ["Should the primary database fail its health checks, the standby node will assume leadership automatically.", "Should the primary database fails its health checks, the standby node will assume leadership automatically.", "Should the primary database failed its health checks, the standby node will assume leadership automatically.", "Should the primary database to fail its health checks, the standby node will assume leadership automatically."], "Should the primary database fail its health checks, the standby node will assume leadership automatically.", "Should + base verbale."),
            ("Specify a risk mitigation safeguard in an architecture proposal:", ["To guard against accidental data loss, all S3 buckets are configured with object versioning and multi-factor delete.", "To prevent data loss, we hope people don't delete files.", "We avoid data loss by telling developers to be careful.", "No data loss is expected."], "To guard against accidental data loss, all S3 buckets are configured with object versioning and multi-factor delete.", "Garde-fou technique documenté.")
        ]
    }
})

print(f"CURRICULUM_L5_L6 fully loaded with {len(CURRICULUM_L5_L6)} lessons (141-160).")
