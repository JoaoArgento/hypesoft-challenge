from mcr.microsoft.com/dotnet/sdk:9.0 as build
workdir /API

copy . .
run dotnet restore
run dotnet publish -c Release -o out

from mcr.microsoft.com/dotnet/aspnet:8.0

workdir /API
copy --from=build /API/out .

expose 5000

entrypoint ["dotnet", "API.dll"]
