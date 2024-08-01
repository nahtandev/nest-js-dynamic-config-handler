# Dynamic configuration handler in Nest JS

## Extract
Si vous souhaitez utiliser le module de configuration de Nest JS de façon dynamique pour chager vos variables d'environnement et de configuration , vous trouverez dans ce projet un exemple de comment y procéder. 

## Read More
Il est très courant dans un projet Node JS d'utiliser des variables d'environement pour stocker des informations sensibles telles que les informations d'accès à une base de données ou des clés API etc. Afin d'accéder à ces données dans notre application, on fait recours à des utilitaires qui permettent de charger ces données au démarrage de l'application et ensuite les rendre disponible dans notre application pour toutes utilisations.

Mise à part les variables d'environnement stockés dans des fichiers .env, on peut avoir aussi besoin de stocker des informations qui ne sont pas aussi sensible que les variables d'environnement mais qui ne peuvent pas non plus être stocker comme des constantes dans notre projet Node JS; car procéder ainsi nous oblige à modifier le code et construire  toute l'application à chaque fois qu'on souhaite modifier ces valeurs. 

Pour pouvoir gérer ces cas de figure, on peut faire recours à des fichiers de configuration. Des fichiers de configuration au format lisible pour l'humain sont une bonne option pour stocker ces informations. On peut opter pour le format json ou yaml; mais dans notre cas présent, j'utiliserai le format json.




