import React from 'react';
import Shell from '../../general/shell/shell';
import CardConsultant from '../components/CardConsultant/cardConsultant';

export default function ConsultantPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "95vw", alignItems: "center" }}>
            <CardConsultant avatar="IML" imgAvatar={"https://s3.eu-central-1.amazonaws.com/imo-static-public-prod/img_user/201804/13145615461.jpg"} nume="Iulia Maria Lazar" ocupatie="PFA Iulia Maria Lazar Agent Bucuresti" tel={"0734657475"} descriere="Am experienta in imobiliare din 2012 si in vanzari si consultanta din 2003. Lucrez doar in sistem de reprezentare, ca si avocat de vanzator sau cumparator, dupa caz. Sunt un bun analist si cunoscator al pietei, manager de proiect, om de marketing, bun negociator. Strategia mea de vanzare/ cumparare este intotdeauna 'tailor made', 
                in functie de necesitatile clientului. Lucrez dupa un cod de etica. Dau tot ce este mai bun, livrez cunostinte de neegalat si informatii la zi despre piata si imi utilizez atuurile pentru a-mi ajuta clientii sa vanda sau sa cumpere cu succes proprietati imobiliare."></CardConsultant>
            <CardConsultant avatar="MV" imgAvatar={"https://s3.eu-central-1.amazonaws.com/imo-static-public-prod/img_user/201804/25131743129.jpg"} nume="Madalina Vasile" ocupatie="RE/MAX Properties | Broker imobiliar | Bucuresti" tel="0773829473" descriere="Cred cu tarie ca breasla imobiliara are nevoie de o ridicare a standardului de profesionalism, clientul are nevoie de servicii de calitate, sa fie corect si complet informat, sa inteleaga si sa i se livreze servicii 
                care sa reflecte comisionul achitat la final de tranzactie. Acum 11 ani, atunci cand am decis sa imi dedic timpul si energia unei afaceri in domeniul imobiliar, nu aveam o imagine clara despre ce am de facut, in ce ma bag si ce ma asteapta, acum stiu si cred cu tarie ca avem nevoie de o revolutionare a scalei de valori in piata de servicii imobiliare.
                Cred in ceea ce fac, fac bine ceea ce fac, lucrez intr-un mediu profesionist, alaturi de o echipa minunata si de un partener de renume si incredere in piata imobiliara internationala."></CardConsultant>
            <CardConsultant avatar="CT" imgAvatar="https://s3.eu-central-1.amazonaws.com/imo-static-public-prod/img_user/201806/06110958342.jpg" nume="Christian Tudorache" ocupatie="Kastel Property Management (Kastel Estate) | Broker Imobiliar | Bucuresti" tel={"0723756465"} descriere="În anul 2004 mi-am început cariera profesionala în Allianz Tiriac. Timp de aproape 5 ani am beneficiat de training-uri foarte bine conturate cu o aplicabilitate imediată în activitatea zilnică. A fost o perioadă în care am învățat ce înseamnă vânzări, calitatea serviciilor și orientarea către client de la specialiști cu mulți ani de experiență.
                Începând cu 2009 am schimbat domeniul cu cel de resurse umane. Au fost 4 ani în care am învățat și am pus în practică cunoștinte esențiale pentru dezvoltarea unui business prin prisma umană a lucrurilor. La nici doi ani de activitate, am reușit să creez o echipă de peste 25 de oameni în 4 județe strategice din țară. Împreună am ridicat compania de la zero, ajungând la cea mai mare cifra de afaceri dintre companiile concurente.
                2013 a fost anul când am pășit timid într-un domeniu cu mult mai multe provocări, imobiliare. După multe tatonări ale pieței și particularităților ei, ne-am nișat pe o piață relativ nouă pentru România, dar cu o creștere constantă de la an la an."></CardConsultant>
        </div>
    )
}